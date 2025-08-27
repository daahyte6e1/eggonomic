const LEVEL_INFO = {
  unranked: {
    numberText: "0",
    level: 1,
    textColor: '#414141',
    gradientColors: ["#747474", "#808080", "#656565", "#4B4345"],
    backgroundColors: ["#656565", "#4B4345", "#808080", "#808080"],
    textGradient: {
      start: '#414141',
      end: '#414141'
    },
    title: 'Unranked',
    cardTitle: 'Unranked',
    isCircle: true,
    levelPageTitle: 'Ранг отсутствует',
    levelPageDescription: 'Чем выше ранг, тем больше дохода приносит стейкинг',
    multiplier: 1,
    prices: []
  },
  member: {
    level: 2,
    numberText: "1",
    textColor: '#AB4A29',
    backgroundColors: ["#D68D4D", "#E27D1D", "#F6B475", "#F6B475"],
    gradientColors: ["#FF7700", "#D79447", "#D79447", "#AA6C2D", "#B95D00", "#D27D33"],
    textGradient: {
      start: '#CD7B2E',
      end: '#F1C396'
    },
    title: 'Member',
    isCircle: false,
    cardTitle: 'Member',
    levelPageTitle: 'Вы Member',
    levelPageDescription: 'Чем выше ранг, тем больше дохода приносит стейкинг',
    multiplier: 2,
    prices: [
      // {
      //   key: 'one_month_member',
      //   price: 4,
      //   title: '1 месяц'
      // },
      // {
      //   key: 'six_month_member',
      //   price: 12,
      //   title: '6 месяцев'
      // },
      // {
      //   key: 'one_year_member',
      //   price: 20,
      //   title: '1 месяцев'
      // }
      {
        key: 'one_month_member',
        price: 1,
        title: '1 месяц'
      },
      {
        key: 'six_month_member',
        price: 1,
        title: '6 месяцев'
      },
      {
        key: 'one_year_member',
        price: 1,
        title: '1 месяцев'
      }
    ]
  },
  supporter: {
    level: 3,
    numberText: "2",
    textColor: '#BA8832',
    backgroundColors: ["#FFD100", "#FFCB15", "#FDF473", "#FDF473"],
    gradientColors: ["#FFFF4A", "#FFDE59", "#FF9D00", "#E5D411", "#DEB200", "#C99B02"],
    textGradient: {
      start: '#E6C13E',
      end: '#F7F066'
    },
    title: 'Supporter',
    isCircle: false,
    cardTitle: 'Hatch Support',
    levelPageTitle: 'Вы Hatch Support',
    levelPageDescription: 'Чем выше ранг, тем больше дохода приносит стейкинг',
    multiplier: 4,
    prices: [
      // {
      //   key: 'one_month_supporter',
      //   price: 7,
      //   title: '1 месяц'
      // },
      // {
      //   key: 'six_month_supporter',
      //   price: 21,
      //   title: '6 месяцев'
      // },
      // {
      //   key: 'one_year_supporter',
      //   price: 35,
      //   title: '12 месяцев'
      // }
      {
        key: 'one_month_supporter',
        price: 1,
        title: '1 месяц'
      },
      {
        key: 'six_month_supporter',
        price: 1,
        title: '6 месяцев'
      },
      {
        key: 'one_year_supporter',
        price: 1,
        title: '12 месяцев'
      }
    ]
  },
  believer: {
    level: 4,
    numberText: "3",
    textColor: '#4528D7',
    backgroundColors: ["#802EEA", "#8E54DB", "#C8A2F8", "#C8A2F8"],
    gradientColors: ["#966CCE", "#9278B3", "#8D5BCE", "#7810FF", "#7114EA", "#3C1F61"],
    textGradient: {
      start: '#5D01D6',
      end: '#A77FDC'
    },
    title: 'Believer',
    isCircle: false,
    cardTitle: 'True Believer',
    levelPageTitle: 'Вы True Believer',
    levelPageDescription: 'Поздравляем, у вас максимальный ранг!',
    multiplier: 8,
    prices: [
      // {
      //   key: 'one_month_supporter',
      //   price: 10,
      //   title: '1 месяц'
      // },
      // {
      //   key: 'six_month_supporter',
      //   price: 30,
      //   title: '6 месяцев'
      // },
      // {
      //   key: 'one_year_supporter',
      //   price: 50,
      //   title: '12 месяцев'
      // }
      {
        key: 'one_month_supporter',
        price: 1,
        title: '1 месяц'
      },
      {
        key: 'six_month_supporter',
        price: 1,
        title: '6 месяцев'
      },
      {
        key: 'one_year_supporter',
        price: 1,
        title: '12 месяцев'
      }
    ]
  }
}

export const KEY_BY_LEVEL = {
  1: 'unranked',
  2: 'member',
  3: 'supporter',
  4: 'believer'
}

export const LEVEL_LIST = ['believer', 'supporter', 'member']

export const getLevelInfoByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO]

export const getLevelCardTitleByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO].cardTitle

export const getLevelByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO].level

export const getLevelFactorByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO].multiplier

export const getLevelMinPriceByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO].prices[0].price

export const getLevelTitleByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO]?.title

export const getLevelGradientTextColorByKey = (key: string) => LEVEL_INFO[key as keyof typeof LEVEL_INFO].textGradient