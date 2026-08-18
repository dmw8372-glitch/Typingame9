import https from 'https';
import fs from 'fs';
import { UK_REGIONS } from '../src/data/ukRegions';

const ladUrl = 'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json';
const niUrl = 'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/ni/lgd.json';

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    });
  });
}

function mergeGeometries(geometries: any[]): any {
  if (geometries.length === 1) return geometries[0];
  const allPolygons: any[] = [];
  for (const g of geometries) {
    if (!g) continue;
    if (g.type === 'Polygon') {
      allPolygons.push(g.coordinates);
    } else if (g.type === 'MultiPolygon') {
      allPolygons.push(...g.coordinates);
    }
  }
  return {
    type: 'MultiPolygon',
    coordinates: allPolygons
  };
}

async function buildCleanUKGeoJson() {
  console.log('Fetching datasets...');
  const lad = await fetchJson(ladUrl);
  const ni = await fetchJson(niUrl);

  const allDistricts = [
    ...lad.features.map((f: any) => ({
      name: f.properties.LAD13NM || f.properties.LAD23NM || f.properties.name,
      code: f.properties.LAD13CD || f.properties.LAD23CD || f.properties.id,
      geometry: f.geometry
    })),
    ...ni.features.map((f: any) => ({
      name: f.properties.LGDNAME || f.properties.LGD_NAME || f.properties.name,
      code: f.properties.LGDCODE || f.properties.LGD_CODE || f.properties.id,
      geometry: f.geometry
    }))
  ];

  console.log(`Loaded ${allDistricts.length} source UK districts`);

  // Map each district to one of the 113 UK regions
  const regionGeomMap = new Map<string, any[]>();
  UK_REGIONS.forEach(r => regionGeomMap.set(r.id, []));

  for (const dist of allDistricts) {
    const dName = (dist.name || '').toLowerCase().trim();
    const dCode = (dist.code || '').trim();

    let targetRegionId: string | null = null;

    // 1. Exact London Boroughs
    if (dName === 'city of london') targetRegionId = 'uk_city_of_london';
    else if (dName === 'westminster' || dName === 'city of westminster') targetRegionId = 'uk_westminster';
    else if (dName === 'camden') targetRegionId = 'uk_camden';
    else if (dName === 'greenwich' || dName === 'royal borough of greenwich') targetRegionId = 'uk_greenwich';
    else if (
      dCode.startsWith('E09') ||
      ['barking and dagenham', 'barnet', 'bexley', 'brent', 'bromley', 'croydon', 'ealing', 'enfield',
       'hackney', 'hammersmith and fulham', 'haringey', 'harrow', 'havering', 'hillingdon', 'hounslow',
       'islington', 'kensington and chelsea', 'kingston upon thames', 'lambeth', 'lewisham', 'merton',
       'newham', 'redbridge', 'richmond upon thames', 'southwark', 'sutton', 'tower hamlets',
       'waltham forest', 'wandsworth'].includes(dName)
    ) {
      targetRegionId = 'uk_greater_london';
    }
    // 2. Specific Major Cities / Unitary authorities
    else if (dName === 'brighton and hove') targetRegionId = 'uk_brighton';
    else if (dName === 'southampton') targetRegionId = 'uk_southampton';
    else if (dName === 'portsmouth') targetRegionId = 'uk_portsmouth';
    else if (dName === 'isle of wight') targetRegionId = 'uk_isle_of_wight';
    else if (dName === 'city of bristol' || dName === 'bristol, city of' || dName === 'bristol') targetRegionId = 'uk_bristol';
    else if (dName === 'kingston upon hull, city of' || dName === 'kingston upon hull' || dName === 'hull') targetRegionId = 'uk_hull';
    else if (dName === 'east riding of yorkshire') targetRegionId = 'uk_east_riding';
    else if (dName === 'rutland') targetRegionId = 'uk_rutland';
    else if (dName === 'herefordshire, county of' || dName === 'herefordshire') targetRegionId = 'uk_herefordshire';
    else if (dName === 'city of edinburgh' || dName === 'edinburgh, city of' || dName === 'edinburgh') targetRegionId = 'uk_edinburgh';
    else if (dName === 'glasgow city' || dName === 'glasgow') targetRegionId = 'uk_glasgow';
    else if (dName === 'aberdeen city' || dName === 'aberdeen') targetRegionId = 'uk_aberdeen';
    else if (dName === 'aberdeenshire') targetRegionId = 'uk_aberdeenshire';
    else if (dName === 'dundee city' || dName === 'dundee') targetRegionId = 'uk_dundee';
    else if (dName === 'fife') targetRegionId = 'uk_fife';
    else if (dName === 'highland') targetRegionId = 'uk_highlands';
    else if (dName === 'moray') targetRegionId = 'uk_moray';
    else if (dName === 'angus') targetRegionId = 'uk_angus';
    else if (dName === 'perth and kinross') targetRegionId = 'uk_perth_and_kinross';
    else if (dName === 'stirling') targetRegionId = 'uk_stirling';
    else if (dName === 'falkirk') targetRegionId = 'uk_falkirk';
    else if (dName === 'clackmannanshire') targetRegionId = 'uk_clackmannanshire';
    else if (dName === 'west lothian') targetRegionId = 'uk_west_lothian';
    else if (dName === 'midlothian') targetRegionId = 'uk_midlothian';
    else if (dName === 'east lothian') targetRegionId = 'uk_east_lothian';
    else if (dName === 'scottish borders') targetRegionId = 'uk_scottish_borders';
    else if (dName === 'dumfries and galloway') targetRegionId = 'uk_dumfries_and_galloway';
    else if (dName === 'south lanarkshire') targetRegionId = 'uk_south_lanarkshire';
    else if (dName === 'north lanarkshire') targetRegionId = 'uk_north_lanarkshire';
    else if (dName === 'east dunbartonshire') targetRegionId = 'uk_east_dunbartonshire';
    else if (dName === 'west dunbartonshire') targetRegionId = 'uk_west_dunbartonshire';
    else if (dName === 'renfrewshire') targetRegionId = 'uk_renfrewshire';
    else if (dName === 'east renfrewshire') targetRegionId = 'uk_east_renfrewshire';
    else if (dName === 'inverclyde') targetRegionId = 'uk_inverclyde';
    else if (dName === 'north ayrshire') targetRegionId = 'uk_north_ayrshire';
    else if (dName === 'south ayrshire') targetRegionId = 'uk_south_ayrshire';
    else if (dName === 'east ayrshire') targetRegionId = 'uk_east_ayrshire';
    else if (dName === 'argyll and bute') targetRegionId = 'uk_argyll_and_bute';
    else if (dName === 'orkney islands' || dName === 'orkney') targetRegionId = 'uk_orkney';
    else if (dName === 'shetland islands' || dName === 'shetland') targetRegionId = 'uk_shetland';
    else if (dName === 'na h-eileanan siar' || dName === 'outer hebrides' || dName === 'western isles' || dName === 'eilean siar') targetRegionId = 'uk_outer_hebrides';
    // Wales
    else if (dName === 'cardiff' || dName === 'caerdydd') targetRegionId = 'uk_cardiff';
    else if (dName === 'swansea' || dName === 'abertawe') targetRegionId = 'uk_swansea';
    else if (dName === 'newport' || dName === 'casnewydd') targetRegionId = 'uk_newport';
    else if (dName === 'wrexham' || dName === 'wrecsam') targetRegionId = 'uk_wrexham';
    else if (dName === 'flintshire' || dName === 'sir y fflint') targetRegionId = 'uk_flintshire';
    else if (dName === 'denbighshire' || dName === 'sir ddinbych') targetRegionId = 'uk_denbighshire';
    else if (dName === 'conwy') targetRegionId = 'uk_conwy';
    else if (dName === 'gwynedd') targetRegionId = 'uk_gwynedd';
    else if (dName === 'isle of anglesey' || dName === 'ynys mon' || dName === 'anglesey') targetRegionId = 'uk_anglesey';
    else if (dName === 'powys') targetRegionId = 'uk_powys';
    else if (dName === 'ceredigion') targetRegionId = 'uk_ceredigion';
    else if (dName === 'pembrokeshire' || dName === 'sir benfro') targetRegionId = 'uk_pembrokeshire';
    else if (dName === 'carmarthenshire' || dName === 'sir gaerfyrddin') targetRegionId = 'uk_carmarthenshire';
    else if (dName === 'neath port talbot' || dName === 'castell-nedd port talbot') targetRegionId = 'uk_neath_port_talbot';
    else if (dName === 'bridgend' || dName === 'pen-y-bont ar ogwr') targetRegionId = 'uk_bridgend';
    else if (dName === 'vale of glamorgan' || dName === 'bro morgannwg') targetRegionId = 'uk_vale_of_glamorgan';
    else if (dName === 'rhondda cynon taf') targetRegionId = 'uk_rhondda_cynon_taf';
    else if (dName === 'merthyr tydfil' || dName === 'merthyr tudful') targetRegionId = 'uk_merthyr_tydfil';
    else if (dName === 'caerphilly' || dName === 'caerffili') targetRegionId = 'uk_caerphilly';
    else if (dName === 'blaenau gwent') targetRegionId = 'uk_blaenau_gwent';
    else if (dName === 'torfaen') targetRegionId = 'uk_torfaen';
    // Northern Ireland
    else if (dName === 'belfast' || dCode === 'N09000003') targetRegionId = 'uk_belfast';
    else if (dName.includes('derry') || dName.includes('strabane') || dCode === 'N09000005') targetRegionId = 'uk_derry';
    else if (dName.includes('lisburn') || dName.includes('castlereagh') || dCode === 'N09000007') targetRegionId = 'uk_lisburn';
    else if (dName.includes('newry') || dName.includes('mourne') || dCode === 'N09000010') {
      // Assign to uk_down and uk_newry
      if (regionGeomMap.has('uk_newry')) regionGeomMap.get('uk_newry')!.push(dist.geometry);
      targetRegionId = 'uk_down';
    }
    else if (dName.includes('east coast') || dName.includes('ards') || dName.includes('north down') || dCode === 'N09000011') targetRegionId = 'uk_bangor';
    else if (dName.includes('armagh') || dName.includes('banbridge') || dName.includes('craigavon') || dCode === 'N09000002') targetRegionId = 'uk_armagh';
    else if (dName.includes('fermanagh') || dName.includes('omagh') || dCode === 'N09000006') targetRegionId = 'uk_fermanagh';
    else if (dName.includes('mid ulster') || dCode === 'N09000009') targetRegionId = 'uk_tyrone';
    else if (dName.includes('antrim') || dName.includes('causeway') || dCode === 'N09000001' || dCode === 'N09000008' || dCode === 'N09000004') targetRegionId = 'uk_antrim';
    // English Metropolitan / Counties
    else if (['birmingham', 'coventry', 'dudley', 'sandwell', 'solihull', 'walsall', 'wolverhampton'].includes(dName)) targetRegionId = 'uk_west_midlands';
    else if (['bolton', 'bury', 'manchester', 'oldham', 'rochdale', 'salford', 'stockport', 'tameside', 'trafford', 'wigan'].includes(dName)) targetRegionId = 'uk_greater_manchester';
    else if (['knowsley', 'liverpool', 'st. helens', 'st helens', 'sefton', 'wirral'].includes(dName)) targetRegionId = 'uk_merseyside';
    else if (['barnsley', 'doncaster', 'rotherham', 'sheffield'].includes(dName)) targetRegionId = 'uk_south_yorkshire';
    else if (['bradford', 'calderdale', 'kirklees', 'leeds', 'wakefield'].includes(dName)) targetRegionId = 'uk_west_yorkshire';
    else if (['gateshead', 'newcastle upon tyne', 'north tyneside', 'south tyneside', 'sunderland'].includes(dName)) targetRegionId = 'uk_tyne_and_wear';
    else if (['bracknell forest', 'reading', 'slough', 'west berkshire', 'windsor and maidenhead', 'wokingham'].includes(dName)) targetRegionId = 'uk_berkshire';
    else if (['bedford', 'central bedfordshire', 'luton'].includes(dName)) targetRegionId = 'uk_bedfordshire';
    else if (['cheshire east', 'cheshire west and chester', 'halton', 'warrington'].includes(dName)) targetRegionId = 'uk_cheshire';
    else if (['bournemouth', 'poole', 'bournemouth, christchurch and poole', 'dorset', 'christchurch', 'east dorset', 'north dorset', 'purbeck', 'west dorset', 'weymouth and portland'].includes(dName)) targetRegionId = 'uk_dorset';
    else if (['bath and north east somerset', 'north somerset', 'somerset', 'south somerset', 'taunton deane', 'west somerset', 'mendip', 'sedgemoor'].includes(dName)) targetRegionId = 'uk_somerset';
    else if (['swindon', 'wiltshire'].includes(dName)) targetRegionId = 'uk_wiltshire';
    else if (['plymouth', 'torbay', 'devon', 'east devon', 'exeter', 'mid devon', 'north devon', 'south hams', 'teignbridge', 'torridge', 'west devon'].includes(dName)) targetRegionId = 'uk_devon';
    else if (['cornwall', 'isles of scilly'].includes(dName)) targetRegionId = 'uk_cornwall';
    else if (['durham', 'county durham', 'darlington', 'hartlepool', 'middlesbrough', 'redcar and cleveland', 'stockton-on-tees'].includes(dName)) targetRegionId = 'uk_durham';
    else if (['northumberland'].includes(dName)) targetRegionId = 'uk_northumberland';
    else if (['cumbria', 'allerdale', 'barrow-in-furness', 'carlisle', 'copeland', 'eden', 'south lakeland', 'cumberland', 'westmorland and furness'].includes(dName)) targetRegionId = 'uk_cumbria';
    else if (['north yorkshire', 'craven', 'hambleton', 'harrogate', 'richmondshire', 'ryedale', 'scarborough', 'selby', 'york'].includes(dName)) targetRegionId = 'uk_north_yorkshire';
    else if (['lancashire', 'blackburn with darwen', 'blackpool', 'burnley', 'chorley', 'fylde', 'hyndburn', 'lancaster', 'pendle', 'preston', 'ribble valley', 'rossendale', 'south ribble', 'west lancashire', 'wyre'].includes(dName)) targetRegionId = 'uk_lancashire';
    else if (['north northamptonshire', 'west northamptonshire', 'corby', 'daventry', 'east northamptonshire', 'kettering', 'northampton', 'south northamptonshire', 'wellingborough'].includes(dName)) targetRegionId = 'uk_northamptonshire';
    else if (['worcestershire', 'bromsgrove', 'malvern hills', 'redditch', 'worcester', 'wychavon', 'wyre forest'].includes(dName)) targetRegionId = 'uk_worcestershire';
    else if (['warwickshire', 'north warwickshire', 'nuneaton and bedworth', 'rugby', 'stratford-on-avon', 'warwick'].includes(dName)) targetRegionId = 'uk_warwickshire';
    else if (['staffordshire', 'cannock chase', 'east staffordshire', 'lichfield', 'newcastle-under-lyme', 'south staffordshire', 'stafford', 'staffordshire moorlands', 'tamworth', 'stoke-on-trent'].includes(dName)) targetRegionId = 'uk_staffordshire';
    else if (['shropshire', 'telford and wrekin'].includes(dName)) targetRegionId = 'uk_shropshire';
    else if (['derbyshire', 'amber valley', 'bolsover', 'chesterfield', 'derbyshire dales', 'erewash', 'high peak', 'north east derbyshire', 'south derbyshire', 'derby'].includes(dName)) targetRegionId = 'uk_derbyshire';
    else if (['nottinghamshire', 'ashfield', 'bassetlaw', 'broxtowe', 'gedling', 'mansfield', 'newark and sherwood', 'rushcliffe', 'nottingham'].includes(dName)) targetRegionId = 'uk_nottinghamshire';
    else if (['leicestershire', 'blaby', 'charnwood', 'harborough', 'hinckley and bosworth', 'melton', 'north west leicestershire', 'oadby and wigston', 'leicester'].includes(dName)) targetRegionId = 'uk_leicestershire';
    else if (['lincolnshire', 'boston', 'east lindsey', 'lincoln', 'north kesteven', 'south holland', 'south kesteven', 'west lindsey', 'north lincolnshire', 'north east lincolnshire'].includes(dName)) targetRegionId = 'uk_lincolnshire';
    else if (['oxfordshire', 'cherwell', 'oxford', 'south oxfordshire', 'vale of white horse', 'west oxfordshire'].includes(dName)) targetRegionId = 'uk_oxfordshire';
    else if (['buckinghamshire', 'aylesbury vale', 'chiltern', 'south bucks', 'wycombe', 'milton keynes'].includes(dName)) targetRegionId = 'uk_buckinghamshire';
    else if (['hertfordshire', 'broxbourne', 'dacorum', 'hertsmere', 'north hertfordshire', 'st albans', 'stevenage', 'three rivers', 'watford', 'welwyn hatfield'].includes(dName)) targetRegionId = 'uk_hertfordshire';
    else if (['essex', 'basildon', 'braintree', 'brentwood', 'castle point', 'chelmsford', 'colchester', 'epping forest', 'harlow', 'maldon', 'rochford', 'tendring', 'uttlesford', 'southend-on-sea', 'thurrock'].includes(dName)) targetRegionId = 'uk_essex';
    else if (['suffolk', 'babergh', 'ipswich', 'mid suffolk', 'suffolk coastal', 'waveney', 'forest heath', 'st edmundsbury', 'east suffolk', 'west suffolk'].includes(dName)) targetRegionId = 'uk_suffolk';
    else if (['norfolk', 'breckland', 'broadland', 'great yarmouth', 'king\'s lynn and west norfolk', 'north norfolk', 'norwich', 'south norfolk'].includes(dName)) targetRegionId = 'uk_norfolk';
    else if (['cambridgeshire', 'cambridge', 'east cambridgeshire', 'fenland', 'huntingdonshire', 'south cambridgeshire', 'peterborough'].includes(dName)) targetRegionId = 'uk_cambridgeshire';
    else if (['gloucestershire', 'cheltenham', 'cotswold', 'forest of dean', 'gloucester', 'stroud', 'tewkesbury'].includes(dName)) targetRegionId = 'uk_gloucestershire';
    else if (['surrey', 'elmbridge', 'epsom and ewell', 'guildford', 'mole valley', 'reigate and banstead', 'runnymede', 'spelthorne', 'surrey heath', 'tandridge', 'waverley', 'woking'].includes(dName)) targetRegionId = 'uk_surrey';
    else if (['kent', 'ashford', 'canterbury', 'dartford', 'dover', 'gravesham', 'maidstone', 'sevenoaks', 'shepway', 'folkestone and hythe', 'swale', 'thanet', 'tonbridge and malling', 'tunbridge wells', 'medway'].includes(dName)) targetRegionId = 'uk_kent';
    else if (['east sussex', 'eastbourne', 'hastings', 'lewes', 'rother', 'wealden'].includes(dName)) targetRegionId = 'uk_east_sussex';
    else if (['west sussex', 'adur', 'arun', 'chichester', 'crawley', 'horsham', 'mid sussex', 'worthing'].includes(dName)) targetRegionId = 'uk_west_sussex';
    else if (['hampshire', 'basingstoke and deane', 'east hampshire', 'eastleigh', 'fareham', 'gosport', 'hart', 'havant', 'new forest', 'rushmoor', 'test valley', 'winchester'].includes(dName)) targetRegionId = 'uk_hampshire';

    if (targetRegionId && regionGeomMap.has(targetRegionId)) {
      regionGeomMap.get(targetRegionId)!.push(dist.geometry);
    }
  }

  // Create clean features for all 113 regions
  const features: any[] = [];
  let mappedCount = 0;

  for (const reg of UK_REGIONS) {
    const geoms = regionGeomMap.get(reg.id) || [];
    if (geoms.length > 0) {
      mappedCount++;
      const mergedGeom = mergeGeometries(geoms);
      features.push({
        type: 'Feature',
        id: reg.id,
        properties: {
          id: reg.id,
          region_id: reg.id,
          name: reg.name_en,
          name_en: reg.name_en,
          name_kr: reg.name_kr,
          level: 'uk',
          lat: reg.lat,
          lng: reg.lng,
          region_group: reg.region_group
        },
        geometry: mergedGeom
      });
    } else {
      console.warn(`No geometry mapped for: ${reg.id} (${reg.name_kr})`);
    }
  }

  console.log(`Successfully mapped ${mappedCount} / ${UK_REGIONS.length} UK regions`);

  const outputGeoJson = {
    type: 'FeatureCollection',
    features: features
  };

  fs.writeFileSync('public/geojson/uk-regions.json', JSON.stringify(outputGeoJson));
  console.log('Saved clean public/geojson/uk-regions.json');
}

buildCleanUKGeoJson();
