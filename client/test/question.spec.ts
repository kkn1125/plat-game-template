import { Npc } from "@model/unit";
import { afterEach, beforeAll, describe, expect, it } from "vitest";

describe("질문 기능 테스트", () => {
  let npc: Npc;

  beforeAll(() => {
    npc = new Npc("테스트 NPC");
  });

  afterEach(() => {
    npc.question?.reset();
  });

  it("NPC 초기 상태", () => {
    expect(npc.question?.scripts.length).toStrictEqual(0);
  });

  it("NPC 질문 추가", () => {
    npc.question?.addQuestion("테스트 질문");
    expect(npc.question?.scripts.length).toStrictEqual(1);
  });

  it("NPC 질문 Yield 테스트", () => {
    npc.question?.addQuestion("테스트 질문", "1", "2");
    const question = npc.startConversation();
    const conversation = question?.getNext();
    if (!conversation) return;
    let word = conversation.next();
    expect(word.value).toStrictEqual("테스트 질문");
    word = conversation.next();
    expect(word.value).toStrictEqual("1");
    word = conversation.next();
    expect(word.value).toStrictEqual("2");
    word = conversation.next();
    expect(word.done).toBeTruthy();
    expect(word.value).toStrictEqual(undefined);
  });

  it("NPC 질문 종료", () => {
    npc.question?.addQuestion("테스트 질문", "두번째 질문");
    const question = npc.startConversation();
    const conversation = question?.getNext();
    if (!conversation) return;
    let word = conversation.next();
    expect(word.value).toStrictEqual("테스트 질문");
    word = conversation.next();
    expect(word.value).toStrictEqual("두번째 질문");
    word = conversation.next();
    expect(word.done).toBeTruthy();
  });
});
