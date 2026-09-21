// Animals of India: a first draft for review.
// - animals: name (spoken and shown), one simple fact, photo (Wikimedia Commons, via Wikipedia).
// - states: keyed by map id. `official` = the state animal(s); `animals` = most popular there first.
//   Order within a state is an editorial judgement; correct it freely.
(function (App) {
  App.animals = {
  "tiger": {
    "name": "Tiger",
    "fact": "The tiger is India's national animal. It has orange fur with black stripes.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg/500px-Bengal_tiger_in_Sanjay_Dubri_Tiger_Reserve_December_2024_by_Tisha_Mukherjee_11.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Bengal_tiger"
  },
  "elephant": {
    "name": "Elephant",
    "fact": "The elephant is the biggest animal on land. It uses its long trunk like a hand.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Elephas_maximus_%28Bandipur%29.jpg/500px-Elephas_maximus_%28Bandipur%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_elephant"
  },
  "rhino": {
    "name": "One-horned rhino",
    "fact": "The rhino has one big horn on its nose and thick skin like armour.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg/500px-Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_rhinoceros"
  },
  "lion": {
    "name": "Asiatic lion",
    "fact": "These lions live only in the Gir forest of Gujarat.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Lions.Gir5_%28cropped%29.jpg/500px-Lions.Gir5_%28cropped%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Asiatic_lion"
  },
  "leopard": {
    "name": "Leopard",
    "fact": "The leopard has spots all over and is a very good climber.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg/500px-Indian_leopard_in_Jawai_Bandh_April_2025_by_Tisha_Mukherjee_02.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_leopard"
  },
  "snowleopard": {
    "name": "Snow leopard",
    "fact": "The snow leopard lives high in the snowy mountains. Its long, fluffy tail keeps it warm.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Irbis4.JPG/500px-Irbis4.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Snow_leopard"
  },
  "cloudedleopard": {
    "name": "Clouded leopard",
    "fact": "Its spots look like clouds. It loves to climb trees.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Neofelis_nebulosa%2C_Clouded_leopard.jpg/500px-Neofelis_nebulosa%2C_Clouded_leopard.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Clouded_leopard"
  },
  "redpanda": {
    "name": "Red panda",
    "fact": "The red panda lives in the mountains and loves to eat bamboo.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Red_Panda%2C_Gentle_Tree-Dweller_of_the_Himalayas.jpg/500px-Red_Panda%2C_Gentle_Tree-Dweller_of_the_Himalayas.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Red_panda"
  },
  "blackbuck": {
    "name": "Blackbuck",
    "fact": "The blackbuck is a very fast runner with long, twisty horns.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Blackbuck_male_female.jpg/500px-Blackbuck_male_female.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Blackbuck"
  },
  "chinkara": {
    "name": "Chinkara",
    "fact": "The chinkara is a small gazelle that lives in the desert.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Chinkara_-_Shreeram_M_V_-_Bikaner.jpg/500px-Chinkara_-_Shreeram_M_V_-_Bikaner.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Chinkara"
  },
  "nilgai": {
    "name": "Nilgai",
    "fact": "Nilgai means blue cow. It is the biggest antelope in India.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Nilgai_%28Boselaphus_tragocamelus%29_male.jpg/500px-Nilgai_%28Boselaphus_tragocamelus%29_male.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Nilgai"
  },
  "chital": {
    "name": "Spotted deer",
    "fact": "The spotted deer has white spots on its brown coat.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/066_Chital_in_Ranthambore_National_Park_Photo_by_Giles_Laurent.jpg/500px-066_Chital_in_Ranthambore_National_Park_Photo_by_Giles_Laurent.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Chital"
  },
  "sambar": {
    "name": "Sambar deer",
    "fact": "The sambar is a big deer that likes to be near water.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Sambar_%28Cervus_unicolor_unicolor%29_male.jpg/500px-Sambar_%28Cervus_unicolor_unicolor%29_male.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Sambar_deer"
  },
  "barasingha": {
    "name": "Barasingha",
    "fact": "Barasingha means twelve points. Its antlers have many points.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/The_Swamp_deer_%28Indian_Barahshinga%29.gif/500px-The_Swamp_deer_%28Indian_Barahshinga%29.gif",
    "wiki": "https://en.wikipedia.org/wiki/Barasingha"
  },
  "sangai": {
    "name": "Sangai deer",
    "fact": "The sangai is called the dancing deer. It lives on floating islands in a lake in Manipur.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Panolia_eldii_thamin.jpg/500px-Panolia_eldii_thamin.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Eld's_deer"
  },
  "hangul": {
    "name": "Hangul",
    "fact": "The hangul is a deer from Kashmir with big, branching antlers.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Cervus_cashmeerianus_Smit.jpg/500px-Cervus_cashmeerianus_Smit.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Kashmir_stag"
  },
  "muskdeer": {
    "name": "Musk deer",
    "fact": "The musk deer has no antlers, but it has two little tusks.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Moschus_chrysogaster.jpg/500px-Moschus_chrysogaster.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Alpine_musk_deer"
  },
  "gaur": {
    "name": "Gaur",
    "fact": "The gaur, or Indian bison, is the biggest wild cow in the world.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Indian_Gaur_from_anaimalai_hills_JEG5290.jpg/500px-Indian_Gaur_from_anaimalai_hills_JEG5290.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Gaur"
  },
  "wildbuffalo": {
    "name": "Wild water buffalo",
    "fact": "The wild water buffalo loves to cool off in muddy water.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Indian_Water_Buffalo_Bubalus_arnee_by_Dr_Raju_Kasambe_IMG_0347_%2811%29_%28cropped%29.jpg/500px-Indian_Water_Buffalo_Bubalus_arnee_by_Dr_Raju_Kasambe_IMG_0347_%2811%29_%28cropped%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Wild_water_buffalo"
  },
  "mithun": {
    "name": "Mithun",
    "fact": "The mithun is a big, gentle cow of the hill forests.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Gayals_at_Gazipur_Safari_Park.jpg/500px-Gayals_at_Gazipur_Safari_Park.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Gayal"
  },
  "wildass": {
    "name": "Indian wild ass",
    "fact": "The wild ass lives in the Rann of Kutch and can run very fast.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Asiatic_Wild_Ass.jpeg/500px-Asiatic_Wild_Ass.jpeg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_wild_ass"
  },
  "camel": {
    "name": "Camel",
    "fact": "The camel has a hump and can walk a long way in the hot desert.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Camelus_dromedarius_in_Nuweiba.jpg/500px-Camelus_dromedarius_in_Nuweiba.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Dromedary"
  },
  "yak": {
    "name": "Yak",
    "fact": "The yak has long, shaggy hair to keep warm in the cold mountains.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Sarlyk_Yak2.jpg/500px-Sarlyk_Yak2.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Domestic_yak"
  },
  "bharal": {
    "name": "Blue sheep",
    "fact": "The blue sheep climbs steep, rocky mountains.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Bharal_-_Shreeram_M_V_-_Kibber%2C_Spiti_Valley%2C_Himachal_Pradesh%2C_India.jpg/500px-Bharal_-_Shreeram_M_V_-_Kibber%2C_Spiti_Valley%2C_Himachal_Pradesh%2C_India.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Bharal"
  },
  "tahr": {
    "name": "Nilgiri tahr",
    "fact": "The Nilgiri tahr is a mountain goat that climbs rocky hills.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Nilgiri_Tahr_at_Eravikulam_National_Park.jpg/500px-Nilgiri_Tahr_at_Eravikulam_National_Park.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Nilgiri_tahr"
  },
  "serow": {
    "name": "Serow",
    "fact": "The serow looks like a goat with big ears. It lives in hilly forests.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Himalayan_Serow_Pangolakha_Wildlife_Sanctuary_East_Sikkim_Sikkim_India_13.02.2016.jpg/500px-Himalayan_Serow_Pangolakha_Wildlife_Sanctuary_East_Sikkim_Sikkim_India_13.02.2016.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Himalayan_serow"
  },
  "liontailed": {
    "name": "Lion-tailed macaque",
    "fact": "This monkey has a silver mane like a lion, and a tuft at the end of its tail.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Lion-tailed_Macaque_in_Bristol_Zoo.jpg/500px-Lion-tailed_Macaque_in_Bristol_Zoo.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Lion-tailed_macaque"
  },
  "gibbon": {
    "name": "Hoolock gibbon",
    "fact": "The hoolock gibbon is India's only ape. It swings from tree to tree and sings loudly.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Hoolock_hoolock_001.jpg/500px-Hoolock_hoolock_001.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Western_hoolock_gibbon"
  },
  "goldenlangur": {
    "name": "Golden langur",
    "fact": "The golden langur is a monkey with golden fur.",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_langur.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Gee's_golden_langur"
  },
  "phayre": {
    "name": "Phayre's langur",
    "fact": "This monkey has white rings around its eyes, like glasses.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/%E0%A6%B2%E0%A6%BE%E0%A6%89%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%9B%E0%A6%A1%E0%A6%BC%E0%A6%BE%E0%A6%B0_%E0%A6%9C%E0%A7%80%E0%A6%AC%E0%A6%A8_%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_-_%E0%A6%9A%E0%A6%B6%E0%A6%AE%E0%A6%BE%E0%A6%AA%E0%A6%B0%E0%A6%BE_%E0%A6%B9%E0%A6%A8%E0%A7%81%E0%A6%AE%E0%A6%BE%E0%A6%A8_02.jpg/500px-%E0%A6%B2%E0%A6%BE%E0%A6%89%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%9B%E0%A6%A1%E0%A6%BC%E0%A6%BE%E0%A6%B0_%E0%A6%9C%E0%A7%80%E0%A6%AC%E0%A6%A8_%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_-_%E0%A6%9A%E0%A6%B6%E0%A6%AE%E0%A6%BE%E0%A6%AA%E0%A6%B0%E0%A6%BE_%E0%A6%B9%E0%A6%A8%E0%A7%81%E0%A6%AE%E0%A6%BE%E0%A6%A8_02.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Phayre's_leaf_monkey"
  },
  "langur": {
    "name": "Grey langur",
    "fact": "The grey langur is a monkey with a black face and a very long tail.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Gray_langur_Mudumalai_02.jpg/500px-Gray_langur_Mudumalai_02.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Gray_langur"
  },
  "rhesus": {
    "name": "Rhesus monkey",
    "fact": "The rhesus monkey lives in forests, and in towns too.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Rhesus_macaque_%28Macaca_mulatta_mulatta%29%2C_male%2C_Gokarna.jpg/500px-Rhesus_macaque_%28Macaca_mulatta_mulatta%29%2C_male%2C_Gokarna.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Rhesus_macaque"
  },
  "slothbear": {
    "name": "Sloth bear",
    "fact": "The sloth bear has shaggy black fur and loves to eat ants and honey.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Sloth_Bear_Washington_DC.JPG/500px-Sloth_Bear_Washington_DC.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Sloth_bear"
  },
  "blackbear": {
    "name": "Himalayan black bear",
    "fact": "This bear has a white V shape on its chest.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Ursus_thibetanus_3_%28Wroclaw_zoo%29.JPG/500px-Ursus_thibetanus_3_%28Wroclaw_zoo%29.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Asian_black_bear"
  },
  "giantsquirrel": {
    "name": "Giant squirrel",
    "fact": "The Indian giant squirrel is as big as a cat and has a colourful coat.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Indian_giant_squirrel_in_Kuldiha_Wildlife_Sanctuary_March_2025_by_Tisha_Mukherjee_01.jpg/500px-Indian_giant_squirrel_in_Kuldiha_Wildlife_Sanctuary_March_2025_by_Tisha_Mukherjee_01.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_giant_squirrel"
  },
  "palmsquirrel": {
    "name": "Palm squirrel",
    "fact": "The palm squirrel has three stripes on its back.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Funambulus_palmarum_%28Bengaluru%29.jpg/500px-Funambulus_palmarum_%28Bengaluru%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_palm_squirrel"
  },
  "mongoose": {
    "name": "Grey mongoose",
    "fact": "The mongoose is small and very quick.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Herpestes_edwardsii_at_Hyderaba.jpg/500px-Herpestes_edwardsii_at_Hyderaba.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_grey_mongoose"
  },
  "fishingcat": {
    "name": "Fishing cat",
    "fact": "The fishing cat loves water and catches fish with its paws.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Prionailurus_viverrinus_01.jpg/500px-Prionailurus_viverrinus_01.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Fishing_cat"
  },
  "gangesdolphin": {
    "name": "Ganges river dolphin",
    "fact": "This dolphin lives in rivers. It is India's national water animal.",
    "photo": "https://upload.wikimedia.org/wikipedia/commons/8/81/Ganges_River_Dolphin_cropped.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Ganges_river_dolphin"
  },
  "indusdolphin": {
    "name": "Indus river dolphin",
    "fact": "This river dolphin lives in the Beas river in Punjab.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/South_Asian_river_dolphin_size_comparison.svg/500px-South_Asian_river_dolphin_size_comparison.svg.png",
    "wiki": "https://en.wikipedia.org/wiki/Indus_river_dolphin"
  },
  "irrawaddy": {
    "name": "Irrawaddy dolphin",
    "fact": "This dolphin has a round head. It lives in Chilika lake.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Irrawaddy_dolphin-Orcaella_brevirostris_by_2eight.jpg/500px-Irrawaddy_dolphin-Orcaella_brevirostris_by_2eight.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Irrawaddy_dolphin"
  },
  "gharial": {
    "name": "Gharial",
    "fact": "The gharial is a crocodile with a very long, thin nose for catching fish.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Gharial_%28Gavialis_gangeticus%29_male.jpg/500px-Gharial_%28Gavialis_gangeticus%29_male.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Gharial"
  },
  "mugger": {
    "name": "Mugger crocodile",
    "fact": "The mugger crocodile lives in rivers, lakes and ponds.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Mugger_crocodile_%28Crocodylus_palustris%29_Gal_Oya.jpg/500px-Mugger_crocodile_%28Crocodylus_palustris%29_Gal_Oya.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Mugger_crocodile"
  },
  "saltie": {
    "name": "Saltwater crocodile",
    "fact": "The saltwater crocodile is the biggest reptile in the world.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/SaltwaterCrocodile%28%27Maximo%27%29.jpg/500px-SaltwaterCrocodile%28%27Maximo%27%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Saltwater_crocodile"
  },
  "oliveridley": {
    "name": "Olive ridley turtle",
    "fact": "Thousands of these sea turtles come to the beach together to lay their eggs.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Lepidochelys-olivacea-K%C3%A9lonia-1.JPG/500px-Lepidochelys-olivacea-K%C3%A9lonia-1.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Olive_ridley_sea_turtle"
  },
  "greenturtle": {
    "name": "Green sea turtle",
    "fact": "The green sea turtle swims in the sea and eats sea grass.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Green_sea_turtle_%28Chelonia_mydas%29_Moorea.jpg/500px-Green_sea_turtle_%28Chelonia_mydas%29_Moorea.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Green_sea_turtle"
  },
  "leatherback": {
    "name": "Leatherback turtle",
    "fact": "The leatherback is the biggest turtle in the world.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Leatherback_sea_turtle_Tinglar%2C_USVI_%285839996547%29.jpg/500px-Leatherback_sea_turtle_Tinglar%2C_USVI_%285839996547%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Leatherback_sea_turtle"
  },
  "dugong": {
    "name": "Dugong",
    "fact": "The dugong is a gentle sea cow that eats sea grass.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Dugong.JPG/500px-Dugong.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Dugong"
  },
  "butterflyfish": {
    "name": "Butterfly fish",
    "fact": "The butterfly fish swims around coral reefs.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Pacific_double-saddle_butterflyfish_%28Chaetodon_ulietensis%29_and_other_Chaetodon_Moorea.jpg/500px-Pacific_double-saddle_butterflyfish_%28Chaetodon_ulietensis%29_and_other_Chaetodon_Moorea.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Butterflyfish"
  },
  "peafowl": {
    "name": "Peacock",
    "fact": "The peacock is India's national bird. It spreads its beautiful tail feathers.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Peacock_on_tree_%2852077240794%29.jpg/500px-Peacock_on_tree_%2852077240794%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Indian_peafowl"
  },
  "dhole": {
    "name": "Dhole",
    "fact": "The dhole is a wild dog that lives in a big family.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Dhole_%28Asiatic_wild_dog%29_cropped.jpg/500px-Dhole_%28Asiatic_wild_dog%29_cropped.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Dhole"
  },
  "slowloris": {
    "name": "Slow loris",
    "fact": "The slow loris has big round eyes and moves very slowly at night.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Captive_N._bengalensis_from_Laos_with_6-week_baby.JPG/500px-Captive_N._bengalensis_from_Laos_with_6-week_baby.JPG",
    "wiki": "https://en.wikipedia.org/wiki/Bengal_slow_loris"
  },
  "kiang": {
    "name": "Kiang",
    "fact": "The kiang is a wild donkey of the cold, high mountains.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Kiang_-_Gunjan_Pandey.jpg/500px-Kiang_-_Gunjan_Pandey.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Kiang"
  },
  "marmot": {
    "name": "Himalayan marmot",
    "fact": "The marmot lives in a burrow and whistles when danger comes.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Himalayan_Marmot_at_Tshophu_Lake_Bhutan_091007_b.jpg/500px-Himalayan_Marmot_at_Tshophu_Lake_Bhutan_091007_b.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Himalayan_marmot"
  },
  "markhor": {
    "name": "Markhor",
    "fact": "The markhor is a wild goat with long, twisting horns.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Markhor_Schraubenziege_Capra_falconeri_Zoo_Augsburg-02.jpg/500px-Markhor_Schraubenziege_Capra_falconeri_Zoo_Augsburg-02.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Markhor"
  },
  "coconutcrab": {
    "name": "Coconut crab",
    "fact": "The coconut crab is the biggest crab on land. It can crack coconuts.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Coconut_Crab_Birgus_latro.jpg/500px-Coconut_Crab_Birgus_latro.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Coconut_crab"
  },
  "spinnerdolphin": {
    "name": "Spinner dolphin",
    "fact": "The spinner dolphin jumps out of the water and spins in the air.",
    "photo": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Gray%27s_spinner_dolphin_%28Stenella_longirostris_longirostris%29_Panglao_%28cropped%29.jpg/500px-Gray%27s_spinner_dolphin_%28Stenella_longirostris_longirostris%29_Panglao_%28cropped%29.jpg",
    "wiki": "https://en.wikipedia.org/wiki/Spinner_dolphin"
  }
};

  App.stateAnimals = {
  "ap": {
    "official": ["blackbuck"],
    "animals": ["blackbuck", "tiger", "slothbear", "chital", "oliveridley"]
  },
  "ar": {
    "official": ["mithun"],
    "animals": ["mithun", "redpanda", "gibbon", "cloudedleopard", "tiger"]
  },
  "as": {
    "official": ["rhino"],
    "animals": ["rhino", "elephant", "tiger", "goldenlangur", "gangesdolphin", "wildbuffalo", "gibbon"]
  },
  "br": {
    "official": ["gaur"],
    "animals": ["gaur", "gangesdolphin", "tiger", "nilgai", "gharial"]
  },
  "ct": {
    "official": ["wildbuffalo"],
    "animals": ["wildbuffalo", "tiger", "slothbear", "elephant", "gaur"]
  },
  "ga": {
    "official": ["gaur"],
    "animals": ["gaur", "giantsquirrel", "leopard", "oliveridley", "mugger"]
  },
  "gj": {
    "official": ["lion"],
    "animals": ["lion", "wildass", "blackbuck", "nilgai", "dugong"]
  },
  "hr": {
    "official": ["blackbuck"],
    "animals": ["blackbuck", "nilgai", "peafowl", "leopard", "langur"]
  },
  "hp": {
    "official": ["snowleopard"],
    "animals": ["snowleopard", "muskdeer", "bharal", "blackbear", "yak"]
  },
  "jh": {
    "official": ["elephant"],
    "animals": ["elephant", "tiger", "slothbear", "gaur", "leopard"]
  },
  "ka": {
    "official": ["elephant"],
    "animals": ["elephant", "tiger", "gaur", "liontailed", "dhole", "leopard"]
  },
  "kl": {
    "official": ["elephant"],
    "animals": ["elephant", "tahr", "liontailed", "tiger", "giantsquirrel"]
  },
  "mp": {
    "official": ["barasingha"],
    "animals": ["barasingha", "tiger", "leopard", "slothbear", "gharial"]
  },
  "mh": {
    "official": ["giantsquirrel"],
    "animals": ["giantsquirrel", "tiger", "leopard", "slothbear", "gaur"]
  },
  "mn": {
    "official": ["sangai"],
    "animals": ["sangai", "gibbon", "cloudedleopard", "blackbear"]
  },
  "ml": {
    "official": ["cloudedleopard"],
    "animals": ["cloudedleopard", "gibbon", "elephant", "slowloris"]
  },
  "mz": {
    "official": ["serow"],
    "animals": ["serow", "gibbon", "phayre", "cloudedleopard", "tiger"]
  },
  "nl": {
    "official": ["mithun"],
    "animals": ["mithun", "gibbon", "blackbear", "cloudedleopard"]
  },
  "or": {
    "official": ["sambar"],
    "animals": ["sambar", "oliveridley", "saltie", "tiger", "elephant", "irrawaddy"]
  },
  "pb": {
    "official": ["blackbuck"],
    "animals": ["blackbuck", "indusdolphin", "nilgai", "peafowl"]
  },
  "rj": {
    "official": ["chinkara", "camel"],
    "animals": ["camel", "chinkara", "tiger", "leopard", "blackbuck"]
  },
  "sk": {
    "official": ["redpanda"],
    "animals": ["redpanda", "snowleopard", "yak", "bharal", "blackbear"]
  },
  "tn": {
    "official": ["tahr"],
    "animals": ["tahr", "elephant", "tiger", "liontailed", "dugong", "slothbear"]
  },
  "tg": {
    "official": ["chital"],
    "animals": ["chital", "tiger", "slothbear", "blackbuck", "mugger"]
  },
  "tr": {
    "official": ["phayre"],
    "animals": ["phayre", "gibbon", "cloudedleopard", "elephant", "slowloris"]
  },
  "up": {
    "official": ["barasingha"],
    "animals": ["barasingha", "tiger", "rhino", "gangesdolphin", "gharial", "nilgai"]
  },
  "ut": {
    "official": ["muskdeer"],
    "animals": ["muskdeer", "tiger", "elephant", "snowleopard", "blackbear"]
  },
  "wb": {
    "official": ["fishingcat"],
    "animals": ["fishingcat", "tiger", "rhino", "redpanda", "elephant", "saltie"]
  },
  "jk": {
    "official": ["hangul", "snowleopard"],
    "animals": ["hangul", "snowleopard", "yak", "markhor", "kiang", "marmot", "blackbear"]
  },
  "dl": {
    "official": ["nilgai"],
    "animals": ["nilgai", "rhesus", "peafowl", "mongoose", "palmsquirrel"]
  },
  "ch": {
    "official": ["mongoose"],
    "animals": ["mongoose", "palmsquirrel", "peafowl", "rhesus"]
  },
  "py": {
    "official": ["palmsquirrel"],
    "animals": ["palmsquirrel", "oliveridley", "mongoose"]
  },
  "an": {
    "official": ["dugong"],
    "animals": ["dugong", "saltie", "leatherback", "coconutcrab"]
  },
  "ld": {
    "official": ["butterflyfish"],
    "animals": ["butterflyfish", "greenturtle", "spinnerdolphin"]
  }
};
})(window.App = window.App || {});
