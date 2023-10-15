// 最初に一度だけ読み込まれるファイルです。関数定義などを記述してください。
const tf = TYRANO.kag.variable.tf;
const f = TYRANO.kag.stat.f;

const setupInvestigationBehavior = (itemClass, selectClass) => {
  const item = document.querySelector(itemClass);
  const select = document.querySelector(selectClass);
  const investigationSelect = document.querySelector(".investigation_select");

  item.addEventListener("mouseenter", () => {
    investigationSelect.style.opacity = "0.8";
    select.style.opacity = "1";
  });

  item.addEventListener("mouseleave", () => {
    investigationSelect.style.opacity = "0";
    select.style.opacity = "0";
  });

  item.addEventListener("click", () => {
    investigationSelect.style.opacity = "0";
    select.style.opacity = "0";
  });
};
