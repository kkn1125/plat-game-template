import Effect from "./Effect";

function textEffect({ text, duration }: { text: string; duration: number }) {
  const textHeight = 300;
  const showText = new Effect("textEffect");
  showText.fadeInDuration = 1;
  showText.fadeOutDuration = 1;
  showText.duration = duration || 5;
  showText.renderFx = (ctx, x, y, opacity) => {
    ctx.globalAlpha = opacity;
    const minHeight = Math.min(textHeight, y);
    const textMeasure = ctx.measureText(text);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.font = `bold ${48 * 1}px Galmuri9`;
    ctx.fillStyle = "#000000a6";
    ctx.fillRect(0, 0, x * 2, y * 2);
    ctx.strokeStyle = "ffffff";
    ctx.fillStyle = "#000000";
    ctx.strokeText(text, x - textMeasure.width / 2, minHeight);
    ctx.fillText(text, x - textMeasure.width / 2, minHeight);
  };
  return showText;
}

export default textEffect;
