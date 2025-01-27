import StackableEffect from '@animation/effect/StackableEffect';
import { Unit } from '@model/unit';
// import { GamePalette } from '@config/game-palette.conf';
// import { GLOBAL } from '@config/game.conf';

function hitCountEffect(text: string, mob: Unit, axis: () => XY, duration: number, color?: string | string[]) {
  let height = 0;
  const showText = new StackableEffect('hitCountEffect');
  const windowCenterX = innerWidth / 2;
  const windowCenterY = innerHeight / 2;

  showText.fadeInDuration = 0.5;
  showText.fadeOutDuration = 0.5;
  showText.duration = duration || 1;
  showText.renderFx = (ctx, _x, _y, _opacity) => {
    const opacityHex = 'ff';
    const textSize = ctx.measureText(text);
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.font = `bold ${32 * 1}px Galmuri9`;
    // console.log(textSize.fontBoundingBoxDescent)
    if (Array.isArray(color)) {
      // Create gradient
      const hitColor = ctx.createLinearGradient(
        0,
        axis().y - mob.size.y - height,
        0,
        axis().y - mob.size.y - height - textSize.fontBoundingBoxDescent*3,
      );
      color.forEach((value, i) => {
        const total = color.length - 1;
        hitColor.addColorStop((total - i) / total, value + opacityHex);
      });
      ctx.fillStyle = hitColor;
    } else {
      ctx.fillStyle = color ?? 'green';
    }

    ctx.strokeText(text, axis().x + mob.size.x / 2, axis().y - mob.size.y - height);
    ctx.fillText(text, axis().x + mob.size.x / 2, axis().y - mob.size.y - height);
    height += 1;
    ctx.lineWidth = 1;
  };
  return showText;
}

export default hitCountEffect;
