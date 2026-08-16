import fs from 'fs';
import https from 'https';

const polyToRegionMap = {
  'VN-HN': 'vn_hanoi',
  'VN-SG': 'vn_hochiminh',
  'VN-DN': 'vn_danang',
  'VN-HP': 'vn_haiphong',
  'VN-CT': 'vn_cantho',
  'VN-26': 'vn_hue',
  'VN-34': 'vn_nhatrang',
  'VN-35': 'vn_dalat',
  'VN-13': 'vn_quangninh',
  'VN-47': 'vn_kiengiang',
  'VN-27': 'vn_quangnam',
  'VN-18': 'vn_ninhbinh',
  'VN-02': 'vn_laocai',
  'VN-40': 'vn_binhthuan',
  'VN-36': 'vn_binhthuan',
  'VN-43': 'vn_vungtau',
  'VN-37': 'vn_tayninh',
  'VN-58': 'vn_tayninh',
  'VN-39': 'vn_dongnai',
  'VN-57': 'vn_binhduong',
  'VN-22': 'vn_nghean',
  'VN-23': 'vn_nghean',
  'VN-21': 'vn_thanhhoa',
  'VN-33': 'vn_daklak',
  'VN-72': 'vn_daklak',
  'VN-69': 'vn_thainguyen',
  'VN-54': 'vn_thainguyen',
  'VN-56': 'vn_bacninh',
  'VN-63': 'vn_bacninh',
  'VN-03': 'vn_hagiang',
  'VN-04': 'vn_hagiang',
  'VN-09': 'vn_hagiang',
  'VN-59': 'vn_camau',
  'VN-55': 'vn_camau',
  'VN-71': 'vn_dienbien',
  'VN-01': 'vn_dienbien',
  'VN-05': 'vn_dienbien',
  'VN-24': 'vn_quangbinh',
  'VN-25': 'vn_quangbinh',
  'VN-20': 'vn_thaibinh',
  'VN-67': 'vn_thaibinh',
  'VN-61': 'vn_haiduong',
  'VN-66': 'vn_haiduong',
  'VN-68': 'vn_phutho',
  'VN-70': 'vn_phutho',
  'VN-06': 'vn_phutho',
  'VN-07': 'vn_phutho',
  'VN-14': 'vn_phutho',
  'VN-53': 'vn_phutho',
  'VN-30': 'vn_gialai',
  'VN-28': 'vn_gialai',
  'VN-31': 'vn_gialai',
  'VN-32': 'vn_gialai',
  'VN-29': 'vn_gialai',
  'VN-44': 'vn_angiang',
  'VN-45': 'vn_dongthap',
  'VN-41': 'vn_dongthap',
  'VN-49': 'vn_vinhlong',
  'VN-50': 'vn_vinhlong',
  'VN-51': 'vn_vinhlong',
  'VN-46': 'vn_vinhlong',
  'VN-52': 'vn_vinhlong',
  'VN-73': 'vn_vinhlong'
};

const url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson';

console.log('Downloading Natural Earth Vietnam Administrative Polygons...');
https.get(url, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const g = JSON.parse(data);
    const vn = g.features.filter((f) => f.properties.iso_a2 === 'VN' || f.properties.adm0_a3 === 'VNM');

    const newFeatures = vn.map((f) => {
      const p = f.properties;
      const iso = p.iso_3166_2 || '';
      const mappedId = polyToRegionMap[iso] || 'vn_hanoi';

      return {
        type: 'Feature',
        id: mappedId,
        properties: {
          id: mappedId,
          region_id: mappedId,
          name: p.name_en || p.name,
          name_vi: p.name_vi,
          name_ko: p.name_ko,
          iso_3166_2: iso,
          level: 'vietnam'
        },
        geometry: f.geometry
      };
    });

    const output = {
      type: 'FeatureCollection',
      features: newFeatures
    };

    fs.writeFileSync('./public/geojson/vietnam-provinces.json', JSON.stringify(output));
    console.log('Saved Vietnam GeoJSON with', newFeatures.length, 'real administrative boundary polygons!');
  });
});
