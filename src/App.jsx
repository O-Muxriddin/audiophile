import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function App() {
  const [count, setCount] = useState(1);
  const [state, setState] = useState([]);
  const [loader, setLoader] = useState(false);
  const [eror, setEror] = useState(false);
  const [selekt, setSelekt] = useState("uz");
  const { t, i18n } = useTranslation();
  function inc() {
    setCount(count + 1);
  }
  function dec() {
    setCount(count - 1);
  }
  useEffect(() => {
    setLoader(true);
    fetch(`https://json-api.uz/api/project/multi-languages/${selekt}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => setState(res.data))
      .catch(() => {
        setEror(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [selekt]);
  if (eror) {
    return (
      <div className="flex justify-center items-center mt-100">
        <h1>Xatolik yuzaga keldi iltmos qaytatdan kirib ko'ring!</h1>
      </div>
    );
  }
  if (loader) {
    return (
      <div className="flex justify-center items-center mt-100 ">
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  function handleChange(evt) {
    const values = evt.target.value;
    i18n.changeLanguage(values);
    setSelekt(values);
  }
  return (
    <div className="max-w-350 mx-auto">
      <div className="navbar bg-black shadow-sm flex justify-between items-center px-6 mx-auto">
        <h1 className="ml-12.5 text-white text-xl">audiophile</h1>

        <ul className="menu menu-horizontal text-white gap-8">
          <li>{t("Home")}</li>
          <li>{t("HEADPHONES")}</li>
          <li>{t("SPEAKERS")}</li>
          <li>{t("EARPHONES")}</li>
        </ul>

        <select
          className="text-white bg-black border border-gray-600 rounded px-2 py-1 mr-37"
          onChange={handleChange}
          value={selekt}
        >
          <option value="uz">O'zbek tili</option>
          <option value="ru">Русский язык</option>
          <option value="zh">中文</option>
          <option value="tr">Türkçe</option>
          <option value="ko">한국어</option>
          <option value="es">Español</option>
        </select>
      </div>

      {state.map((el) => (
        <section key={el.id}>
          <div>
            <div className="ml-41.25 mt-40 mr-37.75 flex flex-col md:flex-row items-center gap-10 py-10 ">
              <div className="flex-1 mr-32 flex justify-center md:justify-start">
                <img src="./ipots.svg" alt="image" width={540} height={560} />
              </div>

              <div className="flex-1 flex flex-col gap-6 text-left">
                <h2 className="text-2xl font-bold">{el.name}</h2>
                <p className="text-gray-600">{el.description}</p>
                <p className="font-semibold text-lg">$ {el.price}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button className="px-3 py-1 text-lg" onClick={dec}>
                      -
                    </button>
                    <span className="px-4 py-1">{count}</span>
                    <button className="px-3 py-1 text-lg" onClick={inc}>
                      +
                    </button>
                  </div>
                  <button className="bg-orange-500 text-white px-6 py-2 uppercase font-semibold hover:bg-orange-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-400 flex mt-40  px-6  gap-16 ml-36.25 mr-37.75">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold  mb-6">{t("Feature")}</h2>

              <p className="text-gray-600 leading-7 mb-6">{el.features}</p>
            </div>

            <div className="ml-31">
              <h2 className="text-2xl font-bold  mb-6">{t("INTHEBOX")}</h2>
              <ul className=" flex flex-col">
                {el.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="text-orange-500 font-bold min-w-7.5">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-600 w-60">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
      <main>
        <section className="max-w-350 py-24">
          <div className="flex items-center justify-between ml-[41.25px] mr-[37.75px]">
            <div className=" ml-35.25">
              <h2 className="text-4xl font-bold leading-tight mb-6 w-90">
                {t("CtaTitle")}
              </h2>

              <p className="text-gray-600 leading-7 w-100">{t("CtaText")}</p>
            </div>

            <div className="ml-32 mt-12 mr-10.25">
              <img
                src="./Bitmap.svg"
                alt="person with headphones"
                width={540}
                height={588}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white mt-20 mx-auto">
        <div className="max-w-275 mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
          <div>
            <h2 className="text-lg font-bold mb-6">audiophile</h2>

            <p className="text-sm text-gray-400 leading-6 w-120">
              {t("FooterText")}
            </p>

            <p className="text-sm text-gray-500 mt-8">{t("FooterCopy")}</p>
          </div>

          <div className="flex flex-col md:ml-auto md:items-end gap-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
              <ul className="flex gap-8">
                <li>{t("Home")}</li>
                <li>{t("HEADPHONES")}</li>
                <li>{t("SPEAKERS")}</li>
                <li>{t("EARPHONES")}</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-12">
              <span>
                <img
                  src="./fecebook.svg"
                  alt="fecebok logo"
                  width={24}
                  height={24}
                />
              </span>
              <span>
                <img
                  src="./twiter.svg"
                  alt="tiwiter logo"
                  width={24}
                  height={24}
                />
              </span>
              <span>
                <img
                  src="./instagram.svg"
                  alt="instagram logo"
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
