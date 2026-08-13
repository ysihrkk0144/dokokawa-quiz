// ======================================================
// どこかわクイズ ～Aha!Experience～
// questions.js
//
// ・baseImage：変化前画像
// ・changeImage：変化部分だけの透過WebP
// ・effect：初期版は fade のみ
// ・answerAreas：正解判定エリア（0～100%の相対座標）
// ======================================================

const QUESTIONS = [

  // ====================================================
  // q001 北海道
  // ====================================================
  {
    id: "q001",
    prefecture: "北海道",
    baseImage: "images/q001-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q001-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 47.2,
            y: 20.7,
            radius: 7.9
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q001-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 42.3,
            y: 46.3,
            width: 10.9,
            height: 17.8
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q001-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 87.7,
            y: 70,
            width: 12.1,
            height: 15.5
          }
        ]
      }
    ]
  },


  // ====================================================
  // q002 東京都
  // ====================================================
  {
    id: "q002",
    prefecture: "東京都",
    baseImage: "images/q002-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q002-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 1.7,
            y: 6,
            width: 37.4,
            height: 27.6
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q002-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 49.8,
            y: 55.1,
            radius: 12.6
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q002-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 40.7,
            y: 7.8,
            width: 17.6,
            height: 27.4
          }
        ]
      }
    ]
  },


  // ====================================================
  // q003 静岡県
  // ====================================================
  {
    id: "q003",
    prefecture: "静岡県",
    baseImage: "images/q003-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q003-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "polygon",
            points: [
              [12.6, 32],
              [84.9, 36.2],
              [84.9, 21.2],
              [59.8, 7],
              [36.8, 6.5],
              [15.4, 22.3],
              [13.8, 32]
            ]
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q003-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 75.1,
            y: 28.4,
            radius: 15.8
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q003-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 16.9,
            y: 0.2,
            width: 27.7,
            height: 16
          }
        ]
      }
    ]
  },


  // ====================================================
  // q004 岐阜県
  // ====================================================
  {
    id: "q004",
    prefecture: "岐阜県",
    baseImage: "images/q004-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q004-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 12.3,
            y: 57.1,
            radius: 11
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q004-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 35.2,
            y: 41.3,
            radius: 18.2
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q004-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 69.9,
            y: 68.1,
            width: 29.5,
            height: 29
          }
        ]
      }
    ]
  },


  // ====================================================
  // q005 愛知県
  // ====================================================
  {
    id: "q005",
    prefecture: "愛知県",
    baseImage: "images/q005-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q005-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 36.3,
            y: 51.7,
            width: 59.2,
            height: 34.3
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q005-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 17.7,
            y: 0.8,
            width: 39.8,
            height: 23.2
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q005-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 60.1,
            y: 90.9,
            radius: 16.3
          }
        ]
      }
    ]
  },


  // ====================================================
  // q006 三重県
  // ====================================================
  {
    id: "q006",
    prefecture: "三重県",
    baseImage: "images/q006-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q006-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 0.7,
            y: 3.6,
            width: 22.8,
            height: 46.7
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q006-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 1.2,
            y: 58.1,
            width: 20.1,
            height: 29.9
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q006-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 69.6,
            y: 32.5,
            radius: 15.3
          }
        ]
      }
    ]
  },


  // ====================================================
  // q007 大阪府
  // ====================================================
  {
    id: "q007",
    prefecture: "大阪府",
    baseImage: "images/q007-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q007-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 1.8,
            y: 66.1,
            width: 32.2,
            height: 33.3
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q007-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 21,
            y: 56.8,
            width: 62.6,
            height: 41.8
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q007-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 52.8,
            y: 19.2,
            radius: 14.5
          }
        ]
      }
    ]
  },


  // ====================================================
  // q008 京都府
  // ====================================================
  {
    id: "q008",
    prefecture: "京都府",
    baseImage: "images/q008-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q008-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 1.1,
            y: 51.7,
            width: 50.9,
            height: 24.8
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q008-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 64.5,
            y: 6.7,
            width: 20.6,
            height: 40.6
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q008-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 26.2,
            y: 0.8,
            width: 32.3,
            height: 30.8
          }
        ]
      }
    ]
  },


  // ====================================================
  // q009 福岡県
  // ====================================================
  {
    id: "q009",
    prefecture: "福岡県",
    baseImage: "images/q009-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q009-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 32.2,
            y: 51.5,
            width: 36.1,
            height: 36.2
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q009-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 33.4,
            y: 8,
            radius: 17.2
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q009-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 0.2,
            y: 50.7,
            width: 25.3,
            height: 45
          }
        ]
      }
    ]
  },


  // ====================================================
  // q010 沖縄県
  // ====================================================
  {
    id: "q010",
    prefecture: "沖縄県",
    baseImage: "images/q010-0.webp",

    variants: [
      {
        id: "a",
        changeImage: "images/q010-a.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 24.9,
            y: 66.1,
            width: 48.9,
            height: 19.1
          }
        ]
      },

      {
        id: "b",
        changeImage: "images/q010-b.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "rect",
            x: 34.3,
            y: 42.6,
            width: 30.8,
            height: 30.8
          }
        ]
      },

      {
        id: "c",
        changeImage: "images/q010-c.webp",
        effect: "fade",

        answerAreas: [
          {
            type: "circle",
            x: 47.1,
            y: 9.1,
            radius: 14.7
          }
        ]
      }
    ]
  }

];