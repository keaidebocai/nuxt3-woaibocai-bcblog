<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - 菠菜的小窝` : "菠菜的小窝";
  },
});
if (typeof window !== "undefined") {
  function clickEffect() {
    let balls: Ball[] = [];
    let longPressed: boolean = false;
    let longPress: NodeJS.Timeout;
    let multiplier: number = 0;
    let width: number, height: number;
    let origin: { x: number; y: number };
    let normal: { x: number; y: number };
    let ctx: CanvasRenderingContext2D | null;
    const colours: string[] = [
      "#F73859",
      "#14FFEC",
      "#00E0FF",
      "#FF99FE",
      "#FAF15D",
    ];
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute(
      "style",
      "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
    );
    const pointer: HTMLSpanElement = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
      ctx = canvas.getContext("2d");
      updateSize();
      window.addEventListener("resize", updateSize, false);
      loop();
      window.addEventListener("mousedown", function (e: MouseEvent) {
        pushBalls(randBetween(10, 20), e.clientX, e.clientY);
        document.body.classList.add("is-pressed");
        longPress = setTimeout(function () {
          document.body.classList.add("is-longpress");
          longPressed = true;
        }, 500);
      });
      window.addEventListener("mouseup", function (e: MouseEvent) {
        clearInterval(longPress);
        if (longPressed == true) {
          document.body.classList.remove("is-longpress");
          pushBalls(
            randBetween(
              50 + Math.ceil(multiplier),
              100 + Math.ceil(multiplier)
            ),
            e.clientX,
            e.clientY
          );
          longPressed = false;
        }
        document.body.classList.remove("is-pressed");
      });
      window.addEventListener("mousemove", function (e: MouseEvent) {
        let x: number = e.clientX;
        let y: number = e.clientY;
        pointer.style.top = y + "px";
        pointer.style.left = x + "px";
      });
    } else {
      console.log("canvas or addEventListener is unsupported!");
    }

    function updateSize() {
      if (!ctx) return;
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(2, 2);
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      origin = {
        x: width / 2,
        y: height / 2,
      };
      normal = {
        x: width / 2,
        y: height / 2,
      };
    }

    class Ball {
      x: number;
      y: number;
      angle: number;
      multiplier: number;
      vx: number;
      vy: number;
      r: number;
      color: string;

      constructor(x: number = origin.x, y: number = origin.y) {
        this.x = x;
        this.y = y;
        this.angle = Math.PI * 2 * Math.random();
        if (longPressed == true) {
          this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
        } else {
          this.multiplier = randBetween(6, 12);
        }
        this.vx =
          (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
        this.vy =
          (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
        this.r = randBetween(8, 12) + 3 * Math.random();
        this.color = colours[Math.floor(Math.random() * colours.length)];
      }

      update(): void {
        this.x += this.vx - normal.x;
        this.y += this.vy - normal.y;
        normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
        normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
        this.r -= 0.3;
        this.vx *= 0.9;
        this.vy *= 0.9;
      }
    }

    function pushBalls(
      count: number = 1,
      x: number = origin.x,
      y: number = origin.y
    ): void {
      for (let i = 0; i < count; i++) {
        balls.push(new Ball(x, y));
      }
    }

    function randBetween(min: number, max: number): number {
      return Math.floor(Math.random() * max) + min;
    }

    function loop(): void {
      if (!ctx) return;
      ctx.fillStyle = "rgba(255, 255, 255, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.r < 0) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
        ctx.fill();
        b.update();
      }
      if (longPressed == true) {
        multiplier += 0.2;
      } else if (!longPressed && multiplier >= 0) {
        multiplier -= 0.4;
      }
      removeBall();
      requestAnimationFrame(loop);
    }

    function removeBall(): void {
      for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (
          b.x + b.r < 0 ||
          b.x - b.r > width ||
          b.y + b.r < 0 ||
          b.y - b.r > height ||
          b.r < 0
        ) {
          balls.splice(i, 1);
        }
      }
    }
  }

  clickEffect();
}
import { useTokenStore } from './store/useToken';
const isShow = useTokenStore()
const open1 = () => {
  if (isShow.getIsShow == 'true') {
    ElNotification({
      title: "欢迎来到菠菜的小窝",
      message: "年轻人你记住，不管记住什么，你一定要记住！",
      offset: 120,
      duration: 0,
      icon: ElIconBell,
      onClose: () => isShow.closeIsShow()
    });
  }
};
onMounted(() => {
  open1();
});
</script>

<template>
  <NuxtLayout>
    <nuxt-page />
  </NuxtLayout>
</template>

<style>
.el-message__content {
  font-size: 18px;
}
.el-notification__title {
  font-size: 18px;
}
.el-notification__content {
  font-size: 18px;
}
</style>

<style lang="scss" scoped></style>
