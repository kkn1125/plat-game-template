export abstract class AttackableUnit {
  // 기본 공격력
  abstract defaultDamage: number;
  // 계산된 공격력 getter*
  abstract damage: number;
  abstract attack(): void;
}
