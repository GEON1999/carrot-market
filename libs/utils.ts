export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const kakaoInit = () => {
  const kakao = (window as any).Kakao;
  if (!kakao.isInitialized()) {
    kakao.init("2f3eb2107be1c2a4e23469c3d78dce70");
  }

  return kakao;
};
