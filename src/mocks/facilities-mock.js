export const facilitiesMock = [
  {
    id: "facility-1",
    coverImage:
      "https://captainsbarbershop.de/wp-content/uploads/2019/09/Location-Herrenfriseur-Barber-Captains-Barber-Shop.jpg",
    name: "Barbershop 1",
    address: "Koblenz metternich",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit.",
    rating: 4.3,
    location: {
      lat: 37.988251,
      lng: -122.23242,
    },
    distance: 10,
    time: {
      foot: 30,
      car: 5,
      bicycle: 10,
    },
    ratingCnt: 121,
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/596d6ed9d2b8575f4b481fe8/1570137834935-ZKLXWDRQADKFJALZJMBV/IMG_0086.jpg",
      "https://www.americanexpress.com/de-de/amexcited/media/cache/default/cms/2021/12/Barbershops-Stuttgart-Herrenhaus-2.jpg",
      "https://i.pinimg.com/originals/76/21/bb/7621bb6087ee02d1c51a38663c88e6b0.jpg",
      "https://i0.wp.com/mikesbarbershops.com/wp-content/uploads/2019/11/IMG_8181.jpg",
      "https://thisisthebarbershop.com/wp-content/uploads/2016/03/TBS_Barrangaroo_1_LRa.jpg",
    ],
    openingHours: {
      opens: "8:10 am",
      closes: "8:00 pm",
    },
    isOpen: true,
    seatCapacity: 7,
    seatAvailable: 3,
    reviews: [
      {
        id: "review-9",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-8",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-7",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
    ],

    professionals: [
      {
        id: "1",
        coverImage:
          "http://americanbarber.org/wp-content/uploads/2021/09/iStock-1302315949-Copy-scaled.jpg",
        name: "Paul walker",
        address: "Koblenz metternich",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc.",
        rating: 4.3,
        ratingCnt: 1003,
        priceRange: [15, 60],
        location: {
          lat: 37.788251,
          lng: -122.43242,
        },
        gallery: [
          "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
          "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
          "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
          "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
          "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
        ],
        services: [
          {
            category: "category-1",
            id: "service-haircut-1",
            name: "Dreadlocks",
            price: 30,
            gender: "male",
            coverImage:
              "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-4",
            id: "service-haircut-2",
            name: "Curly cut",
            price: 40,
            gender: "both",
            coverImage:
              "https://www.toptrendsguide.com/wp-content/uploads/2020/01/Short-Curly-Hair-with-Shaved-Sides.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-4",
            id: "service-haircut-3",
            name: "Braids",
            price: 50,
            gender: "female",
            coverImage:
              "https://swivelbeauty.com/blog/wp-content/uploads/2020/08/IMG_6398E64B4B52-1.jpeg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
        ],
      },
    ],
  },
  {
    id: "facility-2",
    coverImage:
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/89/1e/d1/caption.jpg",
    name: "Barbershop 2",
    address: "Koblenz metternich",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit .",
    rating: 4.3,
    location: {
      lat: 37.788241,
      lng: -122.43222,
    },
    distance: 10,
    time: {
      foot: 30,
      car: 5,
      bicycle: 10,
    },
    ratingCnt: 121,
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/596d6ed9d2b8575f4b481fe8/1570137834935-ZKLXWDRQADKFJALZJMBV/IMG_0086.jpg",
      "https://www.americanexpress.com/de-de/amexcited/media/cache/default/cms/2021/12/Barbershops-Stuttgart-Herrenhaus-2.jpg",
      "https://i.pinimg.com/originals/76/21/bb/7621bb6087ee02d1c51a38663c88e6b0.jpg",
      "https://i0.wp.com/mikesbarbershops.com/wp-content/uploads/2019/11/IMG_8181.jpg",
      "https://thisisthebarbershop.com/wp-content/uploads/2016/03/TBS_Barrangaroo_1_LRa.jpg",
    ],
    openingHours: {
      opens: "8:10 am",
      closes: "8:00 pm",
    },
    isOpen: false,
    seatCapacity: 7,
    seatAvailable: 3,
    reviews: [
      {
        id: "review-6",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-5",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-4",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
    ],
    professionals: [
      {
        id: "99",
        coverImage:
          "https://media.gq-magazine.co.uk/photos/5efcae3187e549a3c5063a64/master/w_1920,h_1280,c_limit/20200701-barbers-02.jpg",
        name: "John doe",
        address: "Koblenz metternich",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc.",
        rating: 4.3,
        ratingCnt: 1003,
        priceRange: [15, 60],
        location: {
          lat: 46.829853,
          lng: -71.254028,
        },
        gallery: [
          "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
          "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
          "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
          "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
          "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
        ],
        services: [
          {
            category: "category-3",
            id: "service-haircut-94",
            name: "Dreadlocks",
            price: 30,
            gender: "male",
            coverImage:
              "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-1",
            id: "service-haircut-95",
            name: "Curly cut",
            price: 40,
            gender: "both",
            coverImage:
              "https://www.toptrendsguide.com/wp-content/uploads/2020/01/Short-Curly-Hair-with-Shaved-Sides.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-2",
            id: "service-haircut-96",
            name: "Braids",
            price: 50,
            gender: "female",
            coverImage:
              "https://swivelbeauty.com/blog/wp-content/uploads/2020/08/IMG_6398E64B4B52-1.jpeg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
        ],
      },
    ],
  },
  {
    id: "facility-3",
    coverImage:
      "https://www.americanexpress.com/de-de/amexcited/media/cache/default/cms/2021/10/Barber-Shops-Berlin-Titelbild.jpg",
    name: "Barbershop 3",
    address: "Koblenz metternich",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit .",
    rating: 4.3,
    location: {
      lat: 37.667221,
      lng: -122.1232,
    },
    distance: 10,
    time: {
      foot: 30,
      car: 5,
      bicycle: 10,
    },
    ratingCnt: 121,
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/596d6ed9d2b8575f4b481fe8/1570137834935-ZKLXWDRQADKFJALZJMBV/IMG_0086.jpg",
      "https://www.americanexpress.com/de-de/amexcited/media/cache/default/cms/2021/12/Barbershops-Stuttgart-Herrenhaus-2.jpg",
      "https://i.pinimg.com/originals/76/21/bb/7621bb6087ee02d1c51a38663c88e6b0.jpg",
      "https://i0.wp.com/mikesbarbershops.com/wp-content/uploads/2019/11/IMG_8181.jpg",
      "https://thisisthebarbershop.com/wp-content/uploads/2016/03/TBS_Barrangaroo_1_LRa.jpg",
    ],
    openingHours: {
      opens: "8:10 am",
      closes: "8:00 pm",
    },
    isOpen: true,
    seatCapacity: 7,
    seatAvailable: 3,
    reviews: [
      {
        id: "review-1",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-2",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
      {
        id: "review-3",
        author: "John doe",
        rating: 3.5,
        authorImage:
          "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus facilisis lobortis erat nec lobortis. Quisque gravida blandit elit ut luctus. Integer id elementum turpis. Sed non nisl turpis.",
      },
    ],
    professionals: [
      {
        id: "100",
        coverImage:
          "https://www.betterteam.com/images/barber-job-description-5184x3456-20201124.jpeg?crop=40:21,smart&width=1200&dpr=2",
        name: "John doe evans",
        address: "Koblenz metternich",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc.",
        rating: 4.3,
        ratingCnt: 1003,
        priceRange: [15, 60],
        location: {
          lat: 46.829853,
          lng: -71.254028,
        },
        gallery: [
          "https://i2-prod.manchestereveningnews.co.uk/incoming/article21411590.ece/ALTERNATES/s615/0_gettyimages-1207048163-170667a.jpg",
          "https://media.beam.usnews.com/d7/18/446edaba4d22a0da5d6f382c5e54/hairdresser.jpg",
          "https://st2.depositphotos.com/2931363/9695/i/950/depositphotos_96952024-stock-photo-young-handsome-man-in-barbershop.jpg",
          "https://ak.picdn.net/shutterstock/videos/9643772/thumb/1.jpg",
          "https://www.thebarbersinc.com/cwsd.php?Z3AuPTQ0MQ/NDM/Zmp8ZClraXIjNit4f2Q.jpg",
        ],
        services: [
          {
            category: "category-1",
            id: "service-haircut-98",
            name: "Dreadlocks",
            price: 30,
            gender: "male",
            coverImage:
              "https://i.pinimg.com/originals/83/1b/5d/831b5dfdc5a785b1603054452698d5a8.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-1",
            id: "service-haircut-99",
            name: "Curly cut",
            price: 40,
            gender: "both",
            coverImage:
              "https://www.toptrendsguide.com/wp-content/uploads/2020/01/Short-Curly-Hair-with-Shaved-Sides.jpg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
          {
            category: "category-1",
            id: "service-haircut-100",
            name: "Braids",
            price: 50,
            gender: "female",
            coverImage:
              "https://swivelbeauty.com/blog/wp-content/uploads/2020/08/IMG_6398E64B4B52-1.jpeg",
            rating: 4.4,
            time: "45 minutes",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat justo ac tortor hendrerit mollis et in nunc",
          },
        ],
      },
    ],
  },
];
