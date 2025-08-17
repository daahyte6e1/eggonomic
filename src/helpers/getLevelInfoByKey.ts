const LEVEL_INFO = {
  unranked: {
    numberText: "Ø",
    textColor: '#000000',
    gradientColors: ["#747474", "#808080", "#656565", "#4B4345"],
    backgroundColors: ["#656565", "#4B4345", "#808080", "#808080"],
    title: 'Unranked',
    isCircle: true,
    factor: 1
  },
  member: {
    numberText: "1",
    textColor: '#AB4A29',
    backgroundColors: ["#D68D4D", "#E27D1D", "#F6B475", "#FF5733"],
    gradientColors: ["#FF7700", "#D79447", "#D79447", "#AA6C2D", "#B95D00", "#D27D33"],
    title: 'Member',
    isCircle: false,
    factor: 2,
    prices: [
      {
        key: 'one_month_member',
        price: 4,
        title: '1 месяц'
      },
      {
        key: 'six_month_member',
        price: 12,
        title: '6 месяцев'
      },
      {
        key: 'one_year_member',
        price: 20,
        title: '1 месяцев'
      }
    ]
  },
  supporter: {
    numberText: "2",
    textColor: '#BA8832',
    backgroundColors: ["#FFD100", "#FFCB15", "#FDF473", "#FDF473"],
    gradientColors: ["#FFFF4A", "#FFDE59", "#FF9D00", "#E5D411", "#DEB200", "#C99B02"],
    title: 'Supporter',
    isCircle: false,
    factor: 4,
    prices: [
      {
        key: 'one_month_supporter',
        price: 7,
        title: '1 месяц'
      },
      {
        key: 'six_month_supporter',
        price: 21,
        title: '6 месяцев'
      },
      {
        key: 'one_year_supporter',
        price: 35,
        title: '12 месяцев'
      }
    ]
  },
  believer: {
    numberText: "3",
    textColor: '#BA8832',
    backgroundColors: ["#802EEA", "#8E54DB", "#C8A2F8", "#C8A2F8"],
    gradientColors: ["#966CCE", "#9278B3", "#8D5BCE", "#7810FF", "#7114EA", "#3C1F61"],
    title: 'Believer',
    isCircle: false,
    factor: 8,
    prices: [
      {
        key: 'one_month_supporter',
        price: 10,
        title: '1 месяц'
      },
      {
        key: 'six_month_supporter',
        price: 30,
        title: '6 месяцев'
      },
      {
        key: 'one_year_supporter',
        price: 50,
        title: '12 месяцев'
      }
    ]
  }
}

export const getLevelInfoByKey = (key) => LEVEL_INFO[key]

export const getLevelTitleByKey = (key) => LEVEL_INFO[key]?.title || ''