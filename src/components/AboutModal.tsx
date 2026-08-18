import React from "react";
import { X } from "lucide-react";
import { Logo } from "./Logo";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  logoImg?: string;
  displayLanguage?: "ko" | "en";
  currentScope?: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  logoImg,
  displayLanguage = "ko",
  currentScope = "korea",
}) => {
  if (!isOpen) return null;

  const isEn = displayLanguage === "en";
  const isWorld = currentScope === "world";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-2xl text-slate-900 max-h-[88vh] flex flex-col font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 text-slate-700 transition-colors cursor-pointer z-10"
          title={isEn ? "Close" : "닫기"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Header */}
        <div className={`flex items-center gap-4 pb-5 border-b-2 shrink-0 ${isWorld ? "border-slate-700" : "border-slate-900"}`}>
          <Logo src={logoImg} className="w-12 h-12 shrink-0 drop-shadow-sm" />
          <div>
            <div className={`text-xs font-bold uppercase tracking-wider ${isWorld ? "text-slate-600 font-extrabold" : "text-slate-500"}`}>
              {isEn ? "System Official Document" : "공식 시스템 정보 및 서비스 명세서"}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              MAP TYPING (지도 타자 여행) 서비스 명세서
            </h2>
          </div>
        </div>

        {/* Document Body (Single Flow Text - Official Document Style in Black Text) */}
        <div className="overflow-y-auto my-5 pr-2 text-sm text-black leading-relaxed font-normal flex-1 scrollbar-thin scrollbar-thumb-slate-400 space-y-4">
          <p className="text-justify text-black leading-7">
            본 문서는 MAP TYPING(지도 타자 여행) 공간 지리 정보 연동 타자 학습 시스템의 서비스 명세 및 기술 사양을 기술하는 공식 설명 문서입니다. 본 서비스는 지리 공간 정보 기술과 컴퓨터 타자 입력 정밀 엔진을 결합하여 구축된 교육·학습용 웹 인터랙티브 애플리케이션으로서, 사용자가 타자로 지명을 입력함과 동시에 실제 표준 지도 좌표계 기반의 행정구역 경계 데이터 및 이동 경로를 실시간으로 처리하도록 설계되었습니다. 이를 통해 이용자는 키보드 입력 타수(CPM) 및 정확도를 향상시킴과 동시에 국내외 행정구역, 도도부현, 주(State), 성(Province) 및 전 세계 국가별 지리적 위치와 공간 구조를 체계적으로 습득할 수 있습니다.
          </p>

          <p className="text-justify text-black leading-7">
            본 시스템에서 가공 및 활용되는 모든 지도 및 지리 공간 정보 데이터는 대한민국 및 국제 표준 공공 데이터베이스와 글로벌 오픈 공간정보 레파지토리로부터 정식 수집·구축되었습니다. 대한민국 행정구역 경계 데이터는 국토교통부 국가공간정보포털(NSDI), 국토지리정보원 및 VWORLD 공간정보 오픈플랫폼에서 제공하는 표준 시·도 및 230여 개 시·군·구 단위 행정구역 벡터 데이터(GeoJSON 및 Shapefile)를 직접 가공하여 탑재하였습니다. 또한 일본 47개 도도부현, 미국 50개 주, 중국 34개 성·직할시, 베트남 63개 성 및 전 세계 197개국 국가 단위 행정구역 벡터 데이터는 GADM(Global Administrative Areas) 국제 공간 데이터베이스와 Natural Earth 글로벌 오픈 벡터 데이터셋의 검증된 표준 지적 좌표를 기반으로 구축되었습니다. 배경 지도의 위성 촬영 영상 및 위성 레이어는 Esri ArcGIS World Imagery 시스템을 연동하며, 벡터 지도 타일은 CartoDB 및 OpenStreetMap의 표준 타일 서버를 통하여 안전하게 제공받고 있습니다.
          </p>

          <p className="text-justify text-black leading-7">
            수집 및 구축된 공간 지리 데이터는 웹 브라우저 기반의 공간 엔진 프레임워크를 통하여 실시간 연동 처리됩니다. 첫째, 각 행정구역의 다각형(Polygon 및 MultiPolygon) 경계 좌표 데이터를 웹 환경에서 프레임 저하 없이 부드럽게 렌더링하기 위해 정밀 토폴로지 경량화 기법을 적용하여 좌표 구조를 효율화하였습니다. 둘째, 사용자가 특정 구역의 명칭을 타격하여 입력에 성공하면, 시스템은 동적으로 해당 지역의 식별 코드(행정구역 코드, ISO 코드 및 Hcode)를 즉시 조회합니다. 조회된 공간 객체는 지도 레이어 상에서 지정된 모드 고유의 채우기 색상(Fill Color)으로 즉시 착색되며, 구역 간 연결 직선 및 실제 방문 경로 선(Polyline)이 지도상에 실시간으로 연결 렌더링됩니다. 셋째, 정확한 입력이 이루어질 때마다 해당 행정구역의 중심점(Centroid) 좌표로 카메라 이동(Pan/FlyTo) 및 줌 레벨이 자동으로 조율되어 유저가 시각적 위치와 도심 간 거리를 직관적으로 인지하도록 돕습니다.
          </p>

          <p className="text-justify text-black leading-7">
            또한 본 서비스는 한글 2벌식 및 영문 입력을 지원하며, 자모 조합 정밀 산출 알고리즘을 탑재하여 타자 속도(CPM), WPM, 오타율, 연속 성공 콤보 및 완주 시각 통계를 정밀하게 제공합니다. 멀티플레이어 환경에서는 실시간 WebSocket 네트워킹을 통하여 각 참가자의 방문 구역 상태와 이동 트랙이 실시간 지도 위젯 상에 실시간으로 공유 및 표시됩니다. 본 서비스에 활용된 모든 공간 데이터 및 정보는 대한민국 공공데이터의 제공 및 이용 활성화에 관한 법률 및 국제 오픈 데이터 약관을 준수하여 비영리 교육, 지리 학습 및 연구 목적으로 안전하게 운용됩니다.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-300 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-slate-600">
            MAP TYPING Information System Report © 2026.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 text-white font-bold text-xs rounded-lg shadow transition-all cursor-pointer bg-slate-900 hover:bg-slate-800"
          >
            {isEn ? "Confirm & Close" : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};


