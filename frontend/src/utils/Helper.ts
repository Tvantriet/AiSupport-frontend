export function getBaseUrl(): string {
  return `${window.location.protocol}//${window.location.host}`;
}

export function shuffleArray(data: any[]): any[] {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}

export function getAPIDate(): string {
  const date = new Date();
  return date.toISOString();
}

export function isDevelopment(): boolean {
  return import.meta.env.VITE_APP_ENV === "development";
}

export function isIOS(): boolean {
  const regex = /iPhone|iPad|iPod/i;
  return regex.test(navigator.userAgent);
}

export function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs));
}

export const trimCanvas = (function () {
  function rowBlank(imageData: any, width: number, y: number) {
    for (let x = 0; x < width; ++x) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  function columnBlank(imageData: any, width: number, x: number, top: number, bottom: number) {
    for (let y = top; y < bottom; ++y) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  return function (canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const width = canvas.width;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let top = 0,
      bottom = imageData.height,
      left = 0,
      right = imageData.width;

    while (top < bottom && rowBlank(imageData, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

    // Trim image whitespace
    const trimmed = ctx.getImageData(left, top, right - left, bottom - top);
    const copy = canvas.ownerDocument.createElement("canvas");
    const copyCtx = copy.getContext("2d") as CanvasRenderingContext2D;
    copy.width = trimmed.width;
    copy.height = trimmed.height;
    copyCtx.putImageData(trimmed, 0, 0);

    // Calculate scaling
    const imageWidth = copy.width;
    const imageHeight = copy.height;

    const scaleFactor = Math.min(720 / imageWidth, 720 / imageHeight);

    const newWidth = imageWidth * scaleFactor;
    const newHeight = imageHeight * scaleFactor;

    const x = 720 / 2 - newWidth / 2;
    const y = 720 / 2 - newHeight / 2;

    // Scale image to 720x720 canvas
    const copy2 = canvas.ownerDocument.createElement("canvas");
    const copy2ctx = copy2.getContext("2d") as CanvasRenderingContext2D;
    copy2.width = 720;
    copy2.height = 720;
    copy2ctx.drawImage(copy, x, y, newWidth, newHeight);

    return copy2.toDataURL("image/png", 0.99);
  };
})();
