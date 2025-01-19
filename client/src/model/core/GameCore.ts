type Id = string;

// 게임 코어 클래스
export default class GameCore {
  /* 
  # 코어 클래스
  > 게임의 모든 객체를 관리한다.
   1. 이벤트
    - 유닛 이벤트
    - 서버 이벤트
    - 상호작용 이벤트
    - 애니메이션 이벤트
    - 에러 이벤트
   2. 상태
    - 유닛의 상태
    - 서버의 상태
    - 상호작용 상태
    - 애니메이션 상태
   3. 유닛
    - 몬스터
    - 플레이어
    - NPC
  */

  canvases: Map<
    Id,
    { element: HTMLCanvasElement; ctx: CanvasRenderingContext2D }
  > = new Map();
}
