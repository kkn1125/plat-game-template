import { describe, it, expect, beforeEach } from "vitest";
import { user } from "./mock/user";
import { Unit } from "@model/unit";

describe("유저 테스트", () => {
  let mockUser: Unit;

  beforeEach(() => {
    mockUser = Object.assign(
      Object.create(Object.getPrototypeOf(user)),
      user
    ) as Unit;
  });

  it("유저 생성", () => {
    expect(mockUser).toBeDefined();
  });

  it("유저 공격 데미지 확인", () => {
    mockUser.stat.dex = 15;
    const damage = mockUser.damage;
    expect(damage).toSatisfy((damage) => damage >= 15.0 && damage <= 16.0);
  });

  it("유저 공격 데미지 확인", () => {
    mockUser.stat.dex = 35;
    const damage = mockUser.damage;
    expect(damage).toSatisfy((damage) => damage >= 15.0 && damage <= 17.4);
  });
});
