import GAME_CONF from '@config/game.conf';
import GameMap from '@model/gamemap/GameMap';
import { Unit } from '@model/unit';
import Logger from '@util/Logger';
import GameEngine from './GameEngine';
import { Tile } from '@variable/constant';
import { textChangeFx } from '@store/effects/textChangeFx';
import { makeAutoObservable } from 'mobx';

const WATER_COLLISION_GAP = 15;

export default class GameMapManager {
  logger = new Logger<GameMapManager>(this);

  engine: GameEngine;
  gameMaps: Map<Id, GameMap> = new Map();
  currentMap: GameMap | null = null;

  constructor(engine: GameEngine) {
    this.engine = engine;
    makeAutoObservable(this);
  }

  get controlUnit() {
    return this.engine.controlUnit;
  }

  get mapSizeX() {
    return GAME_CONF.MAP_CONF.DEFAULT.SIZE.X;
  }

  get mapSizeY() {
    return GAME_CONF.MAP_CONF.DEFAULT.SIZE.Y;
  }

  setCurrentMap(gameMap: GameMap) {
    this.logger.scope('AddGameMap').info('맵 설정:', gameMap.name);
    this.currentMap = gameMap;
  }

  addGameMap(gameMap: GameMap) {
    this.logger.scope('AddGameMap').info('맵 추가:', gameMap.name);
    if (this.gameMaps.size === 0) {
      this.logger.scope('AddGameMap').info('기본 게임 맵:', gameMap.name);
      this.currentMap = gameMap;
    }
    this.gameMaps.set(gameMap.name, gameMap);
  }

  changeMap(forwardMap: GameMap) {
    if (this.gameMaps.has(forwardMap.name)) {
      this.logger.scope('AddGameMap').info('맵 변경:', forwardMap.name);
      this.logger.scope('AddGameMap').info('기본 게임 맵:', forwardMap.name);
      this.currentMap = forwardMap;
      textChangeFx(forwardMap.name);
    } else {
      this.logger.scope('ChangeMap').error('존재하지 않는 맵입니다.');
    }
  }

  // 유닛 중심 좌표 계산
  getAxis(currentMap: GameMap, controlUnit: Unit) {
    const unitPosition = controlUnit.position;
    const fields = currentMap.fields;
    const width = fields[0].length * this.mapSizeX;
    const height = fields.length * this.mapSizeY;
    const x = width / 2 + unitPosition.x;
    const y = height / 2 + unitPosition.y;
    return { x, y };
  }

  // 유닛 상단 컬리젼
  collisionTop(currentMap: GameMap, controlUnit: Unit) {
    const fields = currentMap.fields;
    /* 셀 포지션 계산 */
    // const { cellLeftX, cellX, cellRightX, cellTopY } = this.getCellInformation(currentMap, controlUnit);
    const { x, y } = this.getAxis(currentMap, controlUnit);
    const unitHalfSizeX = controlUnit.size.x / 2;
    const unitHalfSizeY = controlUnit.size.y / 2;
    const cellLeftX = Math.floor((x - unitHalfSizeX) / this.mapSizeX);
    const cellX = Math.floor(x / this.mapSizeX);
    const cellRightX = Math.floor((x + unitHalfSizeX) / this.mapSizeX);
    const cellTopY = Math.floor((y - unitHalfSizeY - controlUnit.increaseSpeed) / this.mapSizeY);

    /* 필드 계산 */
    const fieldLeft = fields?.[cellTopY]?.[cellLeftX];
    const field = fields?.[cellTopY]?.[cellX];
    const fieldRight = fields?.[cellTopY]?.[cellRightX];

    if ([fieldLeft, field, fieldRight].some((field) => !field?.passable)) {
      /* 충돌 */
      return true;
    }
    if (!fieldLeft || !field || !fieldRight) {
      /* 충돌 */
      return true;
    }
    /* 통과 */
    return false;
  }
  collisionBottom(currentMap: GameMap, controlUnit: Unit) {
    const fields = currentMap.fields;
    /* 셀 포지션 계산 */
    const { x, y } = this.getAxis(currentMap, controlUnit);
    const unitHalfSizeX = controlUnit.size.x / 2;
    const unitHalfSizeY = controlUnit.size.y / 2;
    const cellLeftX = Math.floor((x - unitHalfSizeX) / this.mapSizeX);
    const cellX = Math.floor(x / this.mapSizeX);
    const cellRightX = Math.floor((x + unitHalfSizeX) / this.mapSizeX);
    const cellBottomY = Math.floor((y + unitHalfSizeY + controlUnit.increaseSpeed) / this.mapSizeY);

    /* 필드 계산 */
    const fieldLeft = fields?.[cellBottomY]?.[cellLeftX];
    const field = fields?.[cellBottomY]?.[cellX];
    const fieldRight = fields?.[cellBottomY]?.[cellRightX];

    // 물 연접 부 컬리젼 범위 조정 - 물로 상단에서 접근
    {
      const cellBottomY = Math.floor((y + unitHalfSizeY + WATER_COLLISION_GAP + controlUnit.increaseSpeed) / this.mapSizeY);

      const fieldLeft = fields?.[cellBottomY]?.[cellLeftX];
      const field = fields?.[cellBottomY]?.[cellX];
      const fieldRight = fields?.[cellBottomY]?.[cellRightX];

      if (
        [fieldLeft, field, fieldRight].some((field) => field?.name === Tile.Water) &&
        [fieldLeft, field, fieldRight].some((field) => !field?.passable)
      ) {
        /* 충돌 */
        return true;
      }
    }

    if ([fieldLeft, field, fieldRight].some((field) => !field?.passable)) {
      /* 충돌 */
      return true;
    }
    if (!fieldLeft || !field || !fieldRight) {
      /* 충돌 */
      return true;
    }
    /* 통과 */
    return false;
  }
  collisionLeft(currentMap: GameMap, controlUnit: Unit) {
    const fields = currentMap.fields;
    /* 셀 포지션 계산 */
    const { x, y } = this.getAxis(currentMap, controlUnit);
    const unitHalfSizeX = controlUnit.size.x / 2;
    const unitHalfSizeY = controlUnit.size.y / 2;
    const cellLeftX = Math.floor((x - unitHalfSizeX - controlUnit.increaseSpeed) / this.mapSizeX);
    const cellTopY = Math.floor((y - unitHalfSizeY) / this.mapSizeY);
    const cellY = Math.floor(y / this.mapSizeY);
    const cellBottomY = Math.floor((y + unitHalfSizeY) / this.mapSizeY);

    /* 필드 계산 */
    const fieldTop = fields?.[cellTopY]?.[cellLeftX];
    const field = fields?.[cellY]?.[cellLeftX];
    const fieldBottom = fields?.[cellBottomY]?.[cellLeftX];

    // 물 연접 부 컬리젼 범위 조정 - 물로 좌측에서 접근
    {
      const cellLeftX = Math.floor((x - unitHalfSizeX - controlUnit.increaseSpeed) / this.mapSizeX);
      const cellBottomY = Math.floor((y + WATER_COLLISION_GAP + unitHalfSizeY) / this.mapSizeY);

      const fieldTop = fields?.[cellTopY]?.[cellLeftX];
      const field = fields?.[cellY]?.[cellLeftX];
      const fieldBottom = fields?.[cellBottomY]?.[cellLeftX];

      if (fieldBottom?.name === Tile.Water && [fieldTop, field, fieldBottom].some((field) => !field?.passable)) {
        /* 충돌 */
        return true;
      }
    }

    if ([fieldTop, field, fieldBottom].some((field) => !field?.passable)) {
      /* 충돌 */
      return true;
    }
    if (!fieldTop || !field || !fieldBottom) {
      /* 충돌 */
      return true;
    }
    /* 통과 */
    return false;
  }
  collisionRight(currentMap: GameMap, controlUnit: Unit) {
    const fields = currentMap.fields;
    /* 셀 포지션 계산 */
    const { x, y } = this.getAxis(currentMap, controlUnit);
    const unitHalfSizeX = controlUnit.size.x / 2;
    const unitHalfSizeY = controlUnit.size.y / 2;
    const cellRightX = Math.floor((x + unitHalfSizeX + controlUnit.increaseSpeed) / this.mapSizeX);
    const cellTopY = Math.floor((y - unitHalfSizeY) / this.mapSizeY);
    const cellY = Math.floor(y / this.mapSizeY);
    const cellBottomY = Math.floor((y + unitHalfSizeY) / this.mapSizeY);

    /* 필드 계산 */
    const fieldTop = fields?.[cellTopY]?.[cellRightX];
    const field = fields?.[cellY]?.[cellRightX];
    const fieldBottom = fields?.[cellBottomY]?.[cellRightX];

    // 물 연접 부 컬리젼 범위 조정 - 물로 우측에서 접근
    {
      const cellRightX = Math.floor((x + unitHalfSizeX + controlUnit.increaseSpeed) / this.mapSizeX);
      const cellBottomY = Math.floor((y + WATER_COLLISION_GAP + unitHalfSizeY) / this.mapSizeY);

      const fieldTop = fields?.[cellTopY]?.[cellRightX];
      const field = fields?.[cellY]?.[cellRightX];
      const fieldBottom = fields?.[cellBottomY]?.[cellRightX];

      if (fieldBottom?.name === Tile.Water && [fieldTop, field, fieldBottom].some((field) => !field?.passable)) {
        /* 충돌 */
        return true;
      }
    }

    if ([fieldTop, field, fieldBottom].some((field) => !field?.passable)) {
      /* 충돌 */
      return true;
    }
    if (!fieldTop || !field || !fieldBottom) {
      /* 충돌 */
      return true;
    }
    /* 통과 */
    return false;
  }
}
