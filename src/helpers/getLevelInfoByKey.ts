const LEVEL_INFO = {
  unranked: {
    numberText: "Ø",
    textColor: '#000000',
    gradientColors: ["#747474", "#808080", "#656565", "#4B4345"],
    title: 'Unranked',
    isCircle: true,
    factor: 8,
    prices: [
      {
        key: 'one_month_believer',
        price: 10,
        title: '1 месяц'
      }
    ]
  },
  member: {
    numberText: "1",
    textColor: '#000000',
    gradientColors: ["#747474", "#808080", "#656565", "#4B4345"],
    title: 'Believer',
    isCircle: false,
    factor: 8,
    prices: [
      {
        key: 'one_month_believer',
        price: 10,
        title: '1 месяц'
      }
    ]
  },
}

export const getLevelInfoByKey = (key) => LEVEL_INFO[key]