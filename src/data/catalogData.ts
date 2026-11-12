import { Product } from '../types';
import { PRODUCT_STORIES } from './productStories';

export interface ProductCategoryGroup {
  id: string;
  name: string;
  description: string;
  productIds: string[];
}

const BASE_CATALOG_PRODUCTS: Product[] = [
  {
    id: 'gel-rua-tay-thao-moc',
    name: 'Gel Rửa Tay Thảo Mộc',
    englishName: 'Herbal Hand Sanitizer Gel',
    category: 'che-pham-thao-moc',
    botanicalName: 'Bio-Fermented Herbal Formula with Wild Orange & Tea Tree',
    origin: 'Trung tâm Nghiên cứu Vi sinh VSA LAB',
    price: 0,
    originalPrice: 0,
    volume: '300ml',
    rating: 5.0,
    reviewsCount: 382,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442760/B%E1%BB%99_s%E1%BA%A3n_ph%E1%BA%A9m_gel_r%E1%BB%ADa_tay_VSA_LAB.png",
    badge: 'Chế Phẩm Sinh Học • VSA LAB',
    tagline: 'Clean Hands, Pure Flora Protection',
    description: 'Gel rửa tay thảo mộc lên men sinh học kết hợp tinh dầu Cam Rừng Tây Giang và tràm trà nguyên chất. Diệt khuẩn 99.9% tự nhiên, bổ sung chiết xuất nha đam dưỡng ẩm mềm mại không làm khô rát da tay.',
    scentNotes: 'Hương vỏ cam tươi mát, hòa quyện tràm trà dịu mát và thảo mộc tự nhiên',
    benefits: [
      'Kháng khuẩn 99.9% vi khuẩn có hại bằng hoạt chất thiên nhiên',
      'Chiết xuất nha đam tươi dưỡng ẩm, bảo vệ hàng rào da tay',
      'Không cồn công nghiệp độc hại, an toàn tuyệt đối cho trẻ nhỏ',
      'Được kiểm định chất lượng vi sinh tại viện Pasteur & VSA LAB'
    ],
    ingredients: 'Nước cất tinh dầu cam rừng, ethanol thực vật lên men mía đường, tinh dầu tràm trà, chiết xuất nha đam, glycerin thực vật.',
    usage: 'Cho 2-3 giọt gel vào lòng bàn tay, xoa đều các ngón tay và mu bàn tay trong 30 giây đến khi khô tự nhiên.',
    storage: 'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.',
    batchNo: '01.GEL/VSA',
    mfgDate: '01.10.2026',
    expDate: '24 tháng'
  },
  {
    id: 'nuoc-lau-san-thao-moc',
    name: 'Nước Lau Sàn Thảo Mộc',
    englishName: 'Herbal Floor Cleaning Solution',
    category: 'che-pham-thao-moc',
    botanicalName: 'Plant-Based Herbal Cleaner (Lemongrass & Wild Orange)',
    origin: 'Trung tâm Khoa học VSA LAB',
    price: 0,
    originalPrice: 0,
    volume: '2 Lít',
    rating: 4.9,
    reviewsCount: 426,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442761/N%C6%B0%E1%BB%9Bc_Lau_S%C3%A0n_Th%E1%BA%A3o_M%E1%BB%99c_T%E1%BB%B1_Nhi%C3%AAn.png",
    badge: '100% Sinh Học • An Toàn Bé & Thú Cưng',
    tagline: 'Safe Steps, Natural Aromatic Home',
    description: 'Nước lau sàn thảo mộc đậm đặc từ tinh chất Sả Chanh Tây Giang, vỏ Cam Rừng và tinh dầu Quế. Xua đuổi muỗi, côn trùng, khử mùi hôi ẩm mốc và mang lại sàn nhà sạch bóng không bết dính.',
    scentNotes: 'Hương sả chanh the mát và ấm áp của tinh dầu quế',
    benefits: [
      'Xua đuổi muỗi, kiến, gián và côn trùng tự nhiên không hóa chất',
      'Làm sạch sâu sàn gạch, sàn gỗ, khô nhanh trong 60 giây không để lại vệt',
      'Hoàn toàn không cay mắt, an toàn tuyệt đối cho bé bò chơi trên sàn'
    ],
    usage: 'Hòa 1-2 nắp vào 5 lít nước sạch rồi lau sàn nhà.',
    storage: 'Đậy kín nắp, để nơi thoáng mát.'
  },
  {
    id: 'nuoc-tay-rua',
    name: 'Nước Tẩy Rửa Thảo Mộc',
    englishName: 'Multi-Purpose Eco Enzyme Cleaner',
    category: 'che-pham-thao-moc',
    botanicalName: 'Eco-Enzyme Multi-Surface Cleanser',
    origin: 'Công nghệ Enzyme VSA LAB',
    price: 0,
    originalPrice: 0,
    volume: '2 Lít',
    rating: 4.9,
    reviewsCount: 310,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442762/N%C6%B0%E1%BB%9Bc_t%E1%BA%A9y_r%E1%BB%ADa_th%E1%BA%A3o_m%E1%BB%99c_VSA.png",
    badge: 'Enzyme Sinh Học',
    tagline: 'Powerful Bio-Cleaning For Modern Homes',
    description: 'Nước tẩy rửa sinh học đa năng từ enzyme vỏ dứa và tinh dầu bưởi tự nhiên. Đánh bay dầu mỡ cứng đầu trong gian bếp, bồn rửa và các bề mặt mà không làm hại da tay người sử dụng.',
    scentNotes: 'Thanh dịu vỏ bưởi tự nhiên, hương thơm sảng khoái dễ chịu',
    benefits: [
      'Cắt đứt liên kết dầu mỡ hữu cơ nhanh chóng bằng enzyme vi sinh',
      'Bảo vệ da tay dịu nhẹ, không mùi hóa chất độc hại nồng gắt',
      'Nước thải tự phân hủy sinh học, thân thiện bảo vệ nguồn nước'
    ],
    usage: 'Xịt trực tiếp lên bề mặt cần làm sạch, dùng khăn lau sạch sau 1-2 phút.'
  },
  {
    id: 'tinh-dau-tra-xanh',
    name: 'Tinh Dầu Trà Xanh',
    englishName: 'Green Tea Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Camellia sinensis Leaf Oil',
    origin: 'Vùng đồi chè cổ thụ Tây Bắc',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 315,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442773/Tinh_D%E1%BA%A7u_Tr%C3%A0_Xanh_VSA_LAB_%E4%BA%94%E5%88%86%E5%BD%A9.png",
    description: 'Chưng cất từ những búp trà non tươi mọng phủ sương sớm. Tinh dầu trà xanh giàu EGCG tự nhiên giúp thanh lọc không gian làm việc, tăng cường sự minh mẫn và làm dịu tinh thần sau giờ làm việc căng thẳng.',
    scentNotes: 'Hương thanh khiết, ngọt dịu nốt trà mộc, phảng phất vị sương sớm',
    benefits: [
      'Chống oxy hóa mạnh mẽ, thanh lọc và khử khuẩn không khí',
      'Tạo bầu không khí thiền tịnh, tăng khả năng sáng tạo và tập trung',
      'Hỗ trợ kiềm dầu, làm dịu da khi pha loãng xông mặt'
    ]
  },
  {
    id: 'tinh-dau-bac-ha',
    name: 'Tinh Dầu Bạc Hà',
    englishName: 'Pure Peppermint Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Mentha piperita Oil',
    origin: 'Thung lũng dược liệu Ninh Bình',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 480,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442767/B%E1%BB%99_s%E1%BA%A3n_ph%E1%BA%A9m_tinh_d%E1%BA%A7u_b%E1%BA%A1c_h%C3%A0_VSA_LAB.png",
    description: 'Chưng cất lôi cuốn hơi nước từ cây bạc hà thân tím bản địa. Hàm lượng Menthol tự nhiên đạt trên 70%, mang lại cảm giác mát lạnh tức thì, thông thoáng đường thở và xua đuổi chuột bọ hiệu quả.',
    scentNotes: 'Mát lạnh sảng khoái, the cay mạnh mẽ, giải tỏa mệt mỏi tức thì',
    benefits: [
      'Giúp tỉnh táo tinh thần, chống say xe và buồn ngủ khi lái xe',
      'Thông thoáng mũi họng, hỗ trợ hô hấp khỏe mạnh trong mùa lạnh',
      'Khắc tinh của chuột bọ, gián và côn trùng gây hại'
    ]
  },
  {
    id: 'tinh-dau-cam-rung-tay-giang',
    name: 'Tinh Dầu Cam Rừng Tây Giang',
    englishName: 'Tay Giang Wild Orange Essential Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Citrus reticulata Peel Oil',
    origin: 'Thôn Tr\'Hy, xã Hùng Sơn, Tây Giang, Quảng Nam',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 512,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442760/B%E1%BB%99_tinh_d%E1%BA%A7u_cam_r%E1%BB%ABng_VSA_LAB.png",
    badge: '100% Pure • VSA LAB',
    tagline: 'From Vietnam\'s Highlands With Pure Botanicals',
    description: '100% tinh dầu vỏ cam rừng nguyên chất chắt lọc từ vùng cao nguyên đại ngàn Tây Giang. Tạo hương thơm tự nhiên, giúp thư giãn, khử mùi, thanh lọc không khí.',
    scentNotes: 'Tươi mát rực rỡ, ngọt ấm thanh khiết của vỏ cam rừng hoang dã, vương vấn sương sớm Trường Sơn',
    benefits: [
      '100% tinh dầu vỏ cam rừng (Citrus reticulata Peel Oil) nguyên chất',
      'Tạo hương thơm tự nhiên, giúp thư giãn, khử mùi, thanh lọc không khí',
      'Xông hương, khuếch tán, pha loãng với dầu nền để massage chăm sóc da',
      'Số lô: 01.10/SXTG | NSX: 05.10.2026 | HSD: 24 tháng | 100% Natural'
    ]
  },
  {
    id: 'tinh-dau-co-huong-bai',
    name: 'Tinh Dầu Cỏ Hương Bài',
    englishName: 'Vetiver Essential Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Chrysopogon zizanioides Root Oil',
    origin: 'Vùng đồi đất cát miền Trung',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 198,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442762/Tinh_d%E1%BA%A7u_c%E1%BB%8F_h%C6%B0%C6%A1ng_b%C3%A0i_VSA_LAB.png",
    description: 'Chiết xuất từ những chùm rễ hương bài già đâm sâu trong lòng đất mẹ. Mùi hương gỗ đất trầm ấm, lưu giữ ký ức thanh bình của làng quê Việt Nam và là liệu pháp an thần tự nhiên tuyệt vời.',
    scentNotes: 'Hương rễ đất đậm đà, nốt khói ấm, ngọt hậu sâu lắng',
    benefits: [
      'Ổn định cảm xúc, giảm chứng mất ngủ kinh niên và hồi hộp',
      'Cân bằng năng lượng cơ thể, hỗ trợ các buổi thực hành yoga thiền',
      'Lưu hương cực kỳ bền bỉ trên vải vóc và không gian'
    ]
  },
  {
    id: 'tinh-dau-chanh-trau-co-quang-ngai',
    name: 'Tinh Dầu Chanh Trâu Cổ Quảng Ngãi',
    englishName: 'Ancient Big Lime Essential Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Citrus aurantifolia var. grandis',
    origin: 'Vùng đất nắng gió Duyên Hải Quảng Ngãi',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 264,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442768/B%E1%BB%99_tinh_d%E1%BA%A7u_chanh_tr%E1%BA%A7u_c%C3%B3_Qu%E1%BA%A3ng_Ng%C3%A3i.png",
    description: 'Giống chanh trâu cổ bản địa vỏ dày mọng tinh dầu, được trồng tự nhiên trên vùng đất duyên hải miền Trung đầy nắng gió. Mùi hương thanh khiết, giải tỏa căng thẳng và mang lại sinh khí dồi dào.',
    scentNotes: 'Thanh nồng rực rỡ, vị chanh tươi giòn tan và tươi mới',
    benefits: [
      'Khử mùi phòng bếp, xe ô tô và khói thuốc lá tức thì',
      'Nâng cao sự tỉnh táo và hào hứng trong công việc',
      'Kháng khuẩn và làm sạch bề mặt tự nhiên'
    ]
  },
  {
    id: 'tinh-dau-gung-tay-giang',
    name: 'Tinh Dầu Gừng Tây Giang',
    englishName: 'Tay Giang Highland Ginger Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Zingiber officinale Root Oil',
    origin: 'Nương rẫy độ dốc cao Tây Giang, Quảng Nam',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 340,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442763/Tinh_d%E1%BA%A7u_g%E1%BB%ABng_T%C3%A2y_Giang_t%E1%BB%B1_nhi%C3%AAn.png",
    description: 'Gừng sẻ núi Tây Giang sinh trưởng tự nhiên trong lòng đất rừng già, củ nhỏ nhưng chắc nịch và lượng tinh dầu đậm đặc. Mang hơi ấm đại ngàn bảo vệ sức khỏe gia đình bạn.',
    scentNotes: 'Cay nồng ấm áp, thảo dược nguyên sơ của núi rừng Trường Sơn',
    benefits: [
      'Giữ ấm cơ thể, phòng cảm hàn và làm ấm chân tay vào mùa lạnh',
      'Xoa bóp giảm đau mỏi lưng vai gáy và hỗ trợ lưu thông khí huyết',
      'Làm dịu cảm giác đầy bụng, khó tiêu và say tàu xe'
    ]
  },
  {
    id: 'tinh-dau-hoa-sen-hong',
    name: 'Tinh Dầu Hoa Sen Hồng',
    englishName: 'Pink Lotus Precious Oil',
    category: 'tinh-dau-hoa',
    botanicalName: 'Nelumbo nucifera Essential Oil',
    origin: 'Vựa sen tự nhiên Đồng Tháp Mười',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 210,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442762/Tinh_ch%E1%BA%A5t_hoa_sen_h%E1%BB%93ng_VSA_Lab.png",
    description: 'Được mệnh danh là "quốc hoa tinh túy". Mỗi mẻ tinh dầu sen hồng đòi hỏi hàng vạn cánh hoa sen tươi thu hái khi sương sớm chưa tan, đem lại trải nghiệm hương thơm tôn quý, thanh khiết tột cùng.',
    scentNotes: 'Hương hoa sen hồng ngạt ngào cao quý, ngọt thanh thoát và bình yên',
    benefits: [
      'Khai mở tâm trí thanh tịnh, đưa tâm hồn về trạng thái an nhiên',
      'Liệu pháp hương thơm cao cấp hàng đầu cho thiền định & dưỡng tâm',
      'Chống oxy hóa, trẻ hóa làn da khi kết hợp cùng dầu dưỡng chất lượng'
    ]
  },
  {
    id: 'tinh-dau-hoa-sen-trang',
    name: 'Tinh Dầu Hoa Sen Trắng',
    englishName: 'White Lotus Sublime Oil',
    category: 'tinh-dau-hoa',
    botanicalName: 'Nelumbo nucifera var. alba',
    origin: 'Đầm sen di sản Cố Đô Huế & Ninh Bình',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 185,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442763/Tinh_d%E1%BA%A7u_Hoa_Sen_Tr%E1%BA%AFng_VSA_Lab.png",
    description: 'Chắt lọc từ những đóa sen trắng tinh khôi của vùng đất cố đô cổ kính. Hương thơm sen trắng mang vẻ đẹp thoát tục, dịu mát và thanh lọc năng lượng tiêu cực trong không gian sống.',
    scentNotes: 'Mát lạnh trong ngần, thanh sạch tao nhã như giọt sương mai trên búp sen',
    benefits: [
      'Giải tỏa âu lo, mang lại cảm giác bình yên sâu thẳm',
      'Thanh tẩy không gian thờ cúng và phòng đọc sách tôn nghiêm',
      'Hỗ trợ tái tạo năng lượng tích cực sau những ngày kiệt sức'
    ]
  },
  {
    id: 'tinh-dau-hoac-huong',
    name: 'Tinh Dầu Hoắc Hương',
    englishName: 'Patchouli Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Pogostemon cablin Leaf Oil',
    origin: 'Vùng trồng dược liệu ven triền sông Trà',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 220,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442764/Tinh_d%E1%BA%A7u_Ho%E1%BA%AFc_H%C6%B0%C6%A1ng_VSA_LAB_%E4%BD%93%E8%82%B2%E5%BD%A9%E7%A5%A8%E5%A4%A9%E5%A4%A9.png",
    description: 'Thu hái từ lá hoắc hương phơi héo nhẹ theo phương pháp cổ truyền trước khi chưng cất hơi nước. Hương thơm trầm lắng bí ẩn, được giới sành mùi hương ưa chuộng làm nốt hương đáy bền vững.',
    scentNotes: 'Nốt gỗ đất nồng nàn, ngọt rêu phong, ấm áp và quyến rũ',
    benefits: [
      'Giữ ẩm và hỗ trợ phục hồi làn da thô ráp, nứt nẻ',
      'Giảm căng thẳng và ổn định tâm trạng trong những ngày u ám',
      'Chống côn trùng cắn và lưu giữ mùi thơm sang trọng cho tủ quần áo'
    ]
  },
  {
    id: 'tinh-dau-hung-que',
    name: 'Tinh Dầu Húng Quế',
    englishName: 'Sweet Basil Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Ocimum basilicum Herb Oil',
    origin: 'Vùng thảo mộc trù phú châu thổ sông Hồng',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.8,
    reviewsCount: 194,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442764/Tinh_d%E1%BA%A7u_h%C3%BAng_qu%E1%BA%BF_VSA_LAB.png",
    description: 'Húng quế ta lá nhỏ giàu hoạt chất linalool tự nhiên. Mùi hương thảo mộc the ngọt vừa tươi mới vừa ấm cúng, giúp làm dịu những cơn đau đầu do căng thẳng công việc.',
    scentNotes: 'The cay ngọt nhẹ, thơm lừng ngào ngạt hương thảo mộc đồng quê',
    benefits: [
      'Xua tan nhức đầu mỏi mắt, tăng tuần hoàn máu não',
      'Làm ấm cơ bụng, hỗ trợ tiêu hóa tốt hơn khi xoa bóp nhẹ',
      'Đuổi muỗi và tạo không khí ấm cúng cho bữa cơm gia đình'
    ]
  },
  {
    id: 'tinh-dau-huong-nhu',
    name: 'Tinh Dầu Hương Nhu',
    englishName: 'Holy Basil (Ocimum gratissimum) Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Ocimum gratissimum Oil',
    origin: 'Vùng đồi bãi Bắc Bộ',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 388,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442768/Tinh_D%E1%BA%A7u_H%C6%B0%C6%A1ng_Nhu_VSA_LAB_Tr%C3%AAn_%C4%90%C3%A1_C%E1%BA%A9m_Th%E1%BA%A1ch.png",
    description: 'Vị thuốc nam quen thuộc trong nồi nước xông cổ truyền của người bà, người mẹ Việt. Giàu hoạt chất Eugenol giúp nuôi dưỡng nang tóc chắc khỏe và bảo vệ cơ thể khỏi phong hàn.',
    scentNotes: 'Nồng ấm hương thảo dược, cay the mộc mạc và gần gũi',
    benefits: [
      'Liệu pháp kích thích mọc tóc con và giảm rụng tóc truyền thống',
      'Xông hơi giải cảm cúm, thông khiếu và giảm ngạt mũi hiệu quả',
      'Khử mùi phòng ngủ và phòng tắm ẩm ướt một cách tự nhiên'
    ]
  },
  {
    id: 'tinh-dau-khuynh-diep',
    name: 'Tinh Dầu Khuynh Diệp',
    englishName: 'Pure Eucalyptus Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Eucalyptus globulus Leaf Oil',
    origin: 'Vùng đồi bazan bạt ngàn Tây Nguyên',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 472,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442775/VSA_Lab__Tinh_d%E1%BA%A7u_khuynh_di%E1%BB%87p_Vi%E1%BB%87t_Nam.png",
    description: 'Chưng cất từ những chiếc lá khuynh diệp già xanh thẫm tích tụ tinh hoa trời đất. Người bạn đồng hành bảo vệ hệ hô hấp cho trẻ nhỏ và người lớn tuổi trong mùa mưa lạnh.',
    scentNotes: 'The mát trong lành, hơi cay nhẹ mở rộng lồng ngực',
    benefits: [
      'Bảo vệ đường hô hấp, làm sạch chất nhầy và thông mũi nhẹ nhàng',
      'Xoa lòng bàn chân giữ ấm cho bé trước khi đi ngủ',
      'Làm dịu vết sưng do muỗi đốt hay dị ứng thời tiết'
    ]
  },
  {
    id: 'tinh-dau-ngai-cuu',
    name: 'Tinh Dầu Ngải Cứu',
    englishName: 'Mugwort Traditional Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Artemisia vulgaris Essential Oil',
    origin: 'Vùng thung lũng đá vôi núi cao phía Bắc',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 230,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442769/Tinh_D%E1%BA%A7u_Ng%E1%BA%A3i_C%E1%BB%A9u_VSA_LAB.png",
    description: 'Chắt lọc từ ngải cứu nhung già giàu tinh dầu. Là phương pháp xoa bóp dưỡng sinh đông y, giúp tán hàn, thông kinh hoạt lạc và giải tỏa đau nhức xương khớp tuyệt vời.',
    scentNotes: 'Thảo dược trầm ấm, hơi đắng nhẹ mang phong vị đông y mộc mạc',
    benefits: [
      'Hỗ trợ giảm đau mỏi vai gáy, khớp gối và đau lưng người cao tuổi',
      'Làm ấm tử cung, giảm co thắt trong những ngày chu kỳ phụ nữ',
      'Xông phòng trừ ẩm mốc và thanh tẩy không gian u tịch'
    ]
  },
  {
    id: 'tinh-dau-oai-huong',
    name: 'Tinh Dầu Oải Hương',
    englishName: 'True Lavender Essential Oil',
    category: 'tinh-dau-hoa',
    botanicalName: 'Lavandula angustifolia Oil',
    origin: 'Cao nguyên sương mờ Đà Lạt',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 520,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794451552/Tinh_d%E1%BA%A7u_o%E1%BA%A3i_h%C6%B0%C6%A1ng_VSA_LAB_tinh_t%E1%BA%BF.png",
    description: 'Chưng cất từ những bông hoa oải hương tím thẫm đượm nắng gió cao nguyên. Nốt hương ngọt ngào ru êm giấc ngủ, làm dịu thần kinh căng thẳng sau những giờ làm việc mệt mỏi.',
    scentNotes: 'Ngọt dịu phấn hoa, êm đềm thư thái, xua tan mọi âu lo',
    benefits: [
      'Thần dược của giấc ngủ ngon và sâu giấc, chống thức giấc nửa đêm',
      'Làm dịu làn da kích ứng, vết bỏng nhẹ và phục hồi da tổn thương',
      'Tạo hương thơm trang nhã lãng mạn cho phòng ngủ'
    ]
  },
  {
    id: 'tinh-dau-que-tra-my',
    name: 'Tinh Dầu Quế Trà My',
    englishName: 'Tra My Cinnamon Royal Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Cinnamomum loureiroi Bark Oil',
    origin: 'Vùng cao Trà My (Quảng Nam) - Cao Sơn Ngọc Quế',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 460,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442761/B%E1%BB%99_tinh_d%E1%BA%A7u_qu%E1%BA%BF_Tr%C3%A0_My_VSA_LAB.png",
    description: 'Vỏ quế Trà My nức tiếng với hàm lượng Cinnamaldehyde cao bậc nhất Việt Nam. Hương thơm cay ngọt nồng ấm mang lại cảm giác sum vầy ấm cúng, khử trùng không khí cực mạnh.',
    scentNotes: 'Cay nồng mãnh liệt, ngọt ấm sâu sắc, tràn ngập năng lượng',
    benefits: [
      'Khử mùi hôi tanh, ẩm mốc và vi khuẩn trong không khí cực nhanh',
      'Tạo không gian ấm áp, xua đi cảm giác lạnh lẽo mùa đông',
      'Pha loãng xoa bóp làm ấm cơ thể khi bị nhiễm lạnh'
    ]
  },
  {
    id: 'tinh-dau-tia-to',
    name: 'Tinh Dầu Tía Tô',
    englishName: 'Perilla Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Perilla frutescens Leaf Oil',
    origin: 'Trang trại hữu cơ sinh thái Bắc Giang',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 215,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442771/Tinh_D%E1%BA%A7u_T%C3%ADa_T%C3%B4_VSA_LAB.png",
    description: 'Tía tô tía lá xoăn giàu perillaldehyde và axit béo omega tự nhiên. Tinh dầu tía tô là bí quyết dưỡng trắng da, làm mờ vết nám và thải độc làn da mịn màng tự nhiên.',
    scentNotes: 'The thanh thảo mộc, hương vị lá tía tô nồng nàn thanh tao',
    benefits: [
      'Xông mặt thải độc bã nhờn, nuôi dưỡng làn da sáng khỏe rạng rỡ',
      'Kháng dị ứng thời tiết và giảm cảm giác ngứa ngáy khó chịu',
      'Tạo mùi hương kích thích khẩu vị và dễ chịu trong gian nhà'
    ]
  },
  {
    id: 'tinh-dau-tuyet-tung',
    name: 'Tinh Dầu Tuyết Tùng',
    englishName: 'Atlas Cedarwood Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Cedrus atlantica Wood Oil',
    origin: 'Rừng tùng cổ thụ vùng Hoàng Liên Sơn',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 290,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442774/Tinh_d%E1%BA%A7u_tuy%E1%BA%BFt_t%C3%B9ng_VSA_LAB.png",
    description: 'Chưng cất từ thân gỗ tuyết tùng ngàn năm trong sương giá. Hương thơm mộc mạc, mạnh mẽ như gốc đại thụ sừng sững, xoa dịu tâm trí đang quay cuồng và tạo cảm giác che chở bình yên.',
    scentNotes: 'Gỗ khô ấm, đượm nốt nhựa thông cổ kính và hương thơm trường tồn',
    benefits: [
      'Giúp tâm trí vững vàng, tăng cường sự kiên nhẫn và tự tin',
      'Định tâm thiền tập, làm sạch trường năng lượng trong phòng làm việc',
      'Chống rụng tóc và cân bằng độ ẩm da đầu khi massage'
    ]
  },
  {
    id: 'tinh-dau-tram-hue',
    name: 'Tinh Dầu Tràm Huế',
    englishName: 'Hue Cajeput Traditional Heritage Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Melaleuca cajuputi Powell',
    origin: 'Làng nghề chưng cất tràm cổ truyền Phú Lộc, Thừa Thiên Huế',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 560,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442777/Tinh_d%E1%BA%A7u_tr%C3%A0m_Hu%E1%BA%BF_VSA_LAB.png",
    badge: 'Di Sản Làng Nghề • Chuẩn Huế',
    description: 'Nấu từ lá tràm gió tự nhiên bằng lò củi truyền thống của xứ Huế mộng mơ. Không cay gắt, an toàn và nâng niu làn da nhạy cảm nhất của trẻ sơ sinh và mẹ bầu.',
    scentNotes: 'Hương tràm thơm dịu, ấm êm không cay mắt, nốt thảo dược đậm đà',
    benefits: [
      'Giữ ấm ngực và bàn chân cho bé, phòng cảm lạnh gió máy',
      'Xoa dịu tức thì vết muỗi đốt, côn trùng cắn không để lại sẹo thâm',
      'Nhỏ vài giọt vào chậu nước tắm hàng ngày tăng đề kháng cho bé'
    ]
  },
  {
    id: 'tinh-dau-xa-huong',
    name: 'Tinh Dầu Xạ Hương',
    englishName: 'Wild Thyme Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Thymus vulgaris Herb Oil',
    origin: 'Vườn dược liệu ôn đới núi cao Sa Pa',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 4.9,
    reviewsCount: 198,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442774/Tinh_d%E1%BA%A7u_x%E1%BA%A1_h%C6%B0%C6%A1ng_VSA_LAB_tinh_t%E1%BA%BF.png",
    description: 'Chưng cất từ loài xạ hương dại sinh trưởng trên các vách đá mát lạnh. Hàm lượng Thymol tự nhiên kháng khuẩn cực mạnh, được ví như lá chắn sinh học bảo vệ vòm họng và không gian sống.',
    scentNotes: 'Thảo mộc thanh cay, sắc bén, kích thích tinh thần mạnh mẽ',
    benefits: [
      'Thanh lọc không khí, tiêu diệt vi khuẩn và nấm mốc trôi nổi',
      'Hỗ trợ hệ miễn dịch tự nhiên, giảm triệu chứng viêm mũi xoang',
      'Tăng tuần hoàn máu, xua tan cảm giác mệt mỏi rệu rã'
    ]
  },
  {
    id: 'tinh-dau-sa-tay-giang',
    name: 'Tinh Dầu Sả Tây Giang',
    englishName: 'Tay Giang Lemongrass Essential Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Cymbopogon citratus (Tây Giang)',
    origin: 'Thôn Tr\'Hy, Hùng Sơn, Tây Giang, Quảng Nam',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 342,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442761/B%E1%BB%99_tinh_d%E1%BA%A7u_s%E1%BA%A3_T%C3%A2y_Giang_thanh_s%E1%BA%A1ch.png",
    badge: 'Đại Ngàn Tây Giang',
    description: 'Chiết xuất từ những bụi sả chanh bản địa mọc hoang dã và canh tác hữu cơ trên nương rẫy đất dốc Tây Giang. Hàm lượng Citral tự nhiên vượt trội, xua đuổi muỗi côn trùng cực mạnh, khử mùi ẩm mốc và mang lại cảm giác sảng khoái.',
    scentNotes: 'Tươi mát, thanh cay thảo mộc, nốt sả chanh rạng rỡ đượm sương sớm',
    benefits: [
      'Xua đuổi muỗi, kiến và côn trùng tự nhiên, an toàn cho trẻ nhỏ',
      'Khử mùi phòng, thanh lọc bầu không khí và xua tan ẩm mốc',
      'Giải tỏa mệt mỏi, nâng cao sự tập trung và giảm stress'
    ]
  },
  {
    id: 'xit-vai-thao-moc',
    name: 'Xịt Vải Thảo Mộc',
    englishName: 'Herbal Fabric & Linen Mist',
    category: 'che-pham-thao-moc',
    botanicalName: 'Bio-Aromatic Linen Mist with Lavender & Cam Rừng',
    origin: 'Trung tâm Nghiên cứu Ứng dụng VSA LAB',
    price: 0,
    originalPrice: 0,
    volume: '250ml',
    rating: 5.0,
    reviewsCount: 278,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442802/X%E1%BB%8Bt_v%E1%BA%A3i_th%E1%BA%A3o_m%E1%BB%99c_H%C6%B0%C6%A1ng_S%C6%B0%C6%A1ng_Mai.png",
    badge: 'Chế Phẩm Sinh Học • Kháng Khuẩn Vải',
    description: 'Nước xịt vải thảo mộc sinh học giúp làm sạch vi khuẩn trên sợi vải quần áo, chăn ga gối đệm, ghế sofa và rèm cửa. Hương thơm hoa oải hương, vỏ cam rừng và trà xanh lưu hương thanh nhã, kháng khuẩn 99.9% và vỗ về giấc ngủ sâu.',
    scentNotes: 'Hương hoa cỏ thanh mát, nốt lavender êm dịu, ấm áp của vỏ cam',
    benefits: [
      'Khử mùi hôi ẩm, mùi thức ăn và khói bụi bám trên quần áo, sợi vải',
      'Kháng khuẩn 99.9% trên chăn ga, gối nệm, bảo vệ làn da nhạy cảm',
      'Hương thơm thảo mộc tự nhiên giúp thư giãn tinh thần và dễ ngủ'
    ],
    usage: 'Lắc đều, xịt cách bề mặt vải 15-20cm, để khô tự nhiên trong 1-2 phút.'
  },
  {
    id: 'tinh-dau-hoa-nhai',
    name: 'Tinh Dầu Hoa Nhài',
    englishName: 'Pure Jasmine Sambac Essential Oil',
    category: 'tinh-dau-hoa',
    botanicalName: 'Jasminum sambac Flower Extract',
    origin: 'Vùng hoa nhài cổ truyền ven sông Hồng & Ninh Bình',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 386,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442763/Tinh_d%E1%BA%A7u_hoa_nh%C3%A0i_VSA_LAB.png",
    badge: 'Tinh Hoa Hương Đêm • VSA LAB',
    description: 'Chắt lọc từ hàng vạn búp hoa nhài ta trắng muốt vừa hé nở trong đêm sương. Hương thơm thanh khiết, ngọt ngào quyến rũ giúp xoa dịu căng thẳng, nâng đỡ cảm xúc và mang lại giấc ngủ êm đềm.',
    scentNotes: 'Ngọt thanh tao nhã, nốt hoa trắng quyến rũ, sâu lắng và vương vấn',
    benefits: [
      'Thư giãn thần kinh sâu, giải tỏa lo âu và nâng cao chất lượng giấc ngủ',
      'Khơi dậy cảm xúc tích cực, tạo không gian phòng ngủ lãng mạn, sang trọng',
      'Nuôi dưỡng làn da mềm mịn, sáng khỏe khi kết hợp cùng dầu nền dưỡng da'
    ]
  },
  {
    id: 'tinh-dau-tra-trang',
    name: 'Tinh Dầu Trà Trắng',
    englishName: 'White Tea Sublime Essential Oil',
    category: 'tinh-dau-thao-moc',
    botanicalName: 'Camellia sinensis (Silver Needle White Tea) Oil',
    origin: 'Đỉnh núi mờ sương Tây Bắc',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 345,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442775/Tinh_d%E1%BA%A7u_tr%C3%A0_tr%E1%BA%AFng_VSA_LAB.png",
    badge: 'Bạch Trà Thượng Hạng • VSA LAB',
    description: 'Chiết xuất từ những búp bạch trà non phủ lớp lông tơ trắng bạc quý hiếm trên đỉnh núi cao. Hương thơm thanh tao, tinh khôi như sương mai giúp thanh lọc không gian sống và đánh thức sự tĩnh tại trong tâm hồn.',
    scentNotes: 'Thanh khiết tinh tế, nốt trà trắng dịu ngọt phảng phất hương hoa cỏ ban mai',
    benefits: [
      'Kiến tạo không gian thư giãn sang trọng chuẩn resort & spa 5 sao',
      'Giàu chất chống oxy hóa tự nhiên, làm dịu căng thẳng và minh mẫn trí tuệ',
      'Khử mùi tinh tế, mang lại bầu không khí trong lành và thanh lịch'
    ]
  },
  {
    id: 'tinh-dau-vanilla',
    name: 'Tinh Dầu Vanilla',
    englishName: 'Pure Botanical Vanilla Essential Oil',
    category: 'tinh-dau-hoa',
    botanicalName: 'Vanilla planifolia Fruit Extract',
    origin: 'Vườn sinh thái cao nguyên Nam Trung Bộ',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 412,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442760/B%E1%BB%99_s%E1%BA%A3n_ph%E1%BA%A9m_tinh_d%E1%BA%A7u_Vanilla_VSA_LAB_1.png",
    badge: 'Ngọt Ấm Tự Nhiên • VSA LAB',
    description: 'Chiết xuất từ những quả vani tự nhiên được ủ lên men thủ công suốt nhiều tháng trời. Hương thơm ngọt ngào, ấm áp và quyến rũ giúp xoa dịu tâm trạng, mang lại cảm giác bình yên, hạnh phúc cho tổ ấm.',
    scentNotes: 'Ngọt ấm kem sữa tự nhiên, nốt gỗ dịu nhẹ, sâu lắng và đầy vỗ về',
    benefits: [
      'Làm dịu hệ thần kinh, giảm căng thẳng, lo âu và cảm giác cô đơn mệt mỏi',
      'Tạo bầu không khí ấm cúng, ngọt ngào và sang trọng cho phòng khách & phòng ngủ',
      'Là nốt hương nền tuyệt vời khi phối trộn cùng tinh dầu Cam Rừng, Quế hoặc Oải Hương'
    ]
  },
  {
    id: 'tinh-dau-mui-gia',
    name: 'Tinh Dầu Mùi Già',
    englishName: 'Traditional Mature Coriander Seed & Herb Oil',
    category: 'tinh-dau-ban-dia',
    botanicalName: 'Coriandrum sativum Mature Herb & Seed Oil',
    origin: 'Vùng đồng bằng Bắc Bộ & Dược liệu Ninh Bình',
    price: 0,
    originalPrice: 0,
    volume: '10ml & 30ml',
    volumes: ['10ml', '30ml'],
    rating: 5.0,
    reviewsCount: 495,
    image: "https://res.cloudinary.com/trouiqgr/image/upload/v1794442761/B%E1%BB%99_tinh_d%E1%BA%A7u_m%C3%B9i_gi%C3%A0_VSA_LAB_thi%E1%BB%81n_nhi%C3%AAn.png",
    badge: 'Hương Tết Cổ Truyền • Di Sản Việt',
    description: 'Chưng cất từ cây mùi già đã trổ hoa kết hạt chắc mẩy trên cánh đồng quê Việt Nam. Mùi hương thảo mộc ấm nồng, thanh khiết gợi nhớ nồi nước tắm tất niên truyền thống, giúp thanh tẩy năng lượng, giữ ấm cơ thể và an thần.',
    scentNotes: 'Hương thảo mộc ấm áp, the dịu hạt mùi già, mộc mạc và đậm đà ký ức đoàn viên',
    benefits: [
      'Pha nước tắm hoặc xông phòng giúp thanh tẩy cơ thể, xua tan hàn khí và mệt mỏi',
      'Giàu hoạt chất Linalool tự nhiên giúp thư giãn tinh thần, ngủ ngon và giảm đau nhức',
      'Mang không khí ấm cúng, bình an và phong vị truyền thống Việt vào không gian sống'
    ]
  }
];

export const CATALOG_PRODUCTS: Product[] = BASE_CATALOG_PRODUCTS.map((prod) => {
  const storyInfo = PRODUCT_STORIES[prod.id];
  if (storyInfo) {
    return {
      ...prod,
      storyChapterTitle: storyInfo.storyChapterTitle,
      storyQuote: storyInfo.storyQuote,
      story: storyInfo.story,
    };
  }
  return prod;
});

export const PRODUCT_CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm (28)' },
  { id: 'tinh-dau-ban-dia', name: 'Tinh Dầu Bản Địa Đại Ngàn' },
  { id: 'tinh-dau-thao-moc', name: 'Tinh Dầu Thảo Mộc Tự Nhiên' },
  { id: 'tinh-dau-hoa', name: 'Tinh Dầu Hoa & Hương Trầm' },
  { id: 'che-pham-thao-moc', name: 'Chế Phẩm Thảo Mộc Sinh Học' },
];
