/**
 * gen firstname
 *
 * @flow
 */

import { oneof, repeat } from './'

const db = {
  en: [
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown',
    'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
    'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
    'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall',
    'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez',
    'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez',
    'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts',
    'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans',
    'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris',
    'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy',
    'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox',
    'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez',
    'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price',
    'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson',
    'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long',
    'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler',
    'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander',
    'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford',
    'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods',
    'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher',
    'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz',
    'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells',
    'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter',
    'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales',
    'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns',
    'Gordon', 'Shaw', 'Holmes', 'Rice', 'Robertson', 'Hunt',
    'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant',
    'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn',
    'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens',
    'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner',
    'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan',
    'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews',
    'Ruiz', 'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter',
    'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims',
    'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields',
    'Gutierrez', 'Ryan', 'Schmidt', 'Carr', 'Vasquez', 'Castillo',
    'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards',
    'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'McCoy',
    'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza',
    'Harvey', 'Little', 'Burton', 'Stanley', 'Nguyen', 'George',
    'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert',
    'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke',
    'Hanson', 'Day', 'Mendoza', 'Moreno', 'Bowman', 'Medina',
    'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson',
    'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd',
    'Davidson', 'Hopkins', 'May', 'Terry', 'Herrera', 'Wade',
    'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe',
    'Jennings', 'Barnett', 'Graves', 'Jimenez', 'Horton',
    'Shelton', 'Barrett', 'Obrien', 'Castro', 'Sutton', 'Gregory',
    'McKinney', 'Lucas', 'Miles', 'Craig', 'Rodriquez', 'Chambers',
    'Holt', 'Lambert', 'Fletcher', 'Watts', 'Bates', 'Hale',
    'Rhodes', 'Pena', 'Beck', 'Newman', 'Haynes', 'McDaniel',
    'Mendez', 'Bush', 'Vaughn', 'Parks', 'Dawson', 'Santiago',
    'Norris', 'Hardy', 'Love', 'Steele', 'Curry', 'Powers',
    'Schultz', 'Barker', 'Guzman', 'Page', 'Munoz', 'Ball',
    'Keller', 'Chandler', 'Weber', 'Leonard', 'Walsh', 'Lyons',
    'Ramsey', 'Wolfe', 'Schneider', 'Mullins', 'Benson', 'Sharp',
    'Bowen', 'Daniel', 'Barber', 'Cummings', 'Hines', 'Baldwin',
    'Griffith', 'Valdez', 'Hubbard', 'Salazar', 'Reeves', 'Warner',
    'Stevenson', 'Burgess', 'Santos', 'Tate', 'Cross', 'Garner',
    'Mann', 'Mack', 'Moss', 'Thornton', 'Dennis', 'McGee', 'Farmer',
    'Delgado', 'Aguilar', 'Vega', 'Glover', 'Manning', 'Cohen',
    'Harmon', 'Rodgers', 'Robbins', 'Newton', 'Todd', 'Blair',
    'Higgins', 'Ingram', 'Reese', 'Cannon', 'Strickland', 'Townsend',
    'Potter', 'Goodwin', 'Walton', 'Rowe', 'Hampton', 'Ortega',
    'Patton', 'Swanson', 'Joseph', 'Francis', 'Goodman', 'Maldonado',
    'Yates', 'Becker', 'Erickson', 'Hodges', 'Rios', 'Conner',
    'Adkins', 'Webster', 'Norman', 'Malone', 'Hammond', 'Flowers',
    'Cobb', 'Moody', 'Quinn', 'Blake', 'Maxwell', 'Pope', 'Floyd',
    'Osborne', 'Paul', 'McCarthy', 'Guerrero', 'Lindsey', 'Estrada',
    'Sandoval', 'Gibbs', 'Tyler', 'Gross', 'Fitzgerald', 'Stokes',
    'Doyle', 'Sherman', 'Saunders', 'Wise', 'Colon', 'Gill',
    'Alvarado', 'Greer', 'Padilla', 'Simon', 'Waters', 'Nunez',
    'Ballard', 'Schwartz', 'McBride', 'Houston', 'Christensen',
    'Klein', 'Pratt', 'Briggs', 'Parsons', 'McLaughlin', 'Zimmerman',
    'French', 'Buchanan', 'Moran', 'Copeland', 'Roy', 'Pittman',
    'Brady', 'McCormick', 'Holloway', 'Brock', 'Poole', 'Frank',
    'Logan', 'Owen', 'Bass', 'Marsh', 'Drake', 'Wong', 'Jefferson',
    'Park', 'Morton', 'Abbott', 'Sparks', 'Patrick', 'Norton', 'Huff',
    'Clayton', 'Massey', 'Lloyd', 'Figueroa', 'Carson', 'Bowers',
    'Roberson', 'Barton', 'Tran', 'Lamb', 'Harrington', 'Casey',
    'Boone', 'Cortez', 'Clarke', 'Mathis', 'Singleton', 'Wilkins',
    'Cain', 'Bryan', 'Underwood', 'Hogan', 'McKenzie', 'Collier',
    'Luna', 'Phelps', 'McGuire', 'Allison', 'Bridges', 'Wilkerson',
    'Nash', 'Summers', 'Atkins'
  ],
  zh: [
    "赵","钱","孙","李", "周","吴","郑","王",
    "冯","陈","褚","卫", "蒋","沈","韩","杨",
    "朱","秦","尤","许", "何","吕","施","张",
    "孔","曹","严","华", "金","魏","陶","姜",
    "戚","谢","邹","喻", "柏","水","窦","章",
    "云","苏","潘","葛", "奚","范","彭","郎",
    "鲁","韦","昌","马", "苗","凤","花","方",
    "俞","任","袁","柳", "酆","鲍","史","唐",
    "费","廉","岑","薛", "雷","贺","倪","汤",
    "滕","殷","罗","毕", "郝","邬","安","常",
    "乐","于","时","傅", "皮","卞","齐","康",
    "伍","余","元","卜", "顾","孟","平","黄",
    "和","穆","萧","尹", "姚","邵","湛","汪",
    "祁","毛","禹","狄", "米","贝","明","臧",
    "计","伏","成","戴", "谈","宋","茅","庞",
    "熊","纪","舒","屈", "项","祝","董","梁",
    "杜","阮","蓝","闵", "席","季","麻","强",
    "贾","路","娄","危", "江","童","颜","郭",
    "梅","盛","林","刁", "钟","丘","徐","邱",
    "骆","高","夏","蔡", "田","樊","胡","凌",
    "霍","虞","万","支", "柯","昝","管","卢",
    "莫","经","房","裘", "缪","干","解","应",
    "宗","丁","宣","贲", "邓","单","杭","洪",
    "包","诸","左","石", "崔","吉","钮","龚",
    "程","嵇","邢","滑", "裴","陆","荣","翁",
    "荀","羊","於","惠", "甄","曲","家","封",
    "芮","羿","储","靳", "汲","邴","糜","松",
    "井","段","富","巫", "乌","焦","巴","弓",
    "牧","隗","山","谷", "车","侯","宓","蓬",
    "全","郗","班","仰", "秋","仲","伊","宫",
    "宁","仇","栾","暴", "甘","钭","厉","戎",
    "祖","武","符","刘", "景","詹","束","龙",
    "叶","幸","司","韶", "郜","黎","蓟","薄",
    "印","宿","白","怀", "蒲","台","从","鄂",
    "索","咸","籍","赖", "卓","蔺","屠","蒙",
    "池","乔","阴","郁", "胥","能","苍","双",
    "闻","莘","党","翟", "谭","贡","劳","逢",
    "逄","姬","申","扶", "堵","冉","宰","郦",
    "雍","郤","璩","桑", "桂","濮","牛","寿",
    "通","边","扈","燕", "冀","郏","浦","尚",
    "农","温","别","庄", "晏","柴","瞿","阎",
    "充","慕","连","茹", "习","宦","艾","鱼",
    "容","向","古","易", "慎","戈","廖","庚",
    "终","暨","居","衡", "步","都","耿","满",
    "弘","匡","国","文", "寇","广","禄","阙",
    "东","欧","殳","沃", "利","蔚","越","夔",
    "隆","师","巩","厍", "聂","晁","勾","敖",
    "融","冷","訾","辛", "阚","那","简","饶",
    "空","曾","毋","沙", "乜","养","鞠","须",
    "丰","巢","关","蒯", "相","查","荆","红",
    "游","竺","权","逯", "盖","益","桓","公",
    "万俟","司马","上官","欧阳","夏侯","诸葛",
    "闻人","东方","赫连","皇甫","尉迟","公羊",
    "澹台","公冶","宗政","濮阳","淳于","单于",
    "太叔","申屠","公孙","仲孙","轩辕","令狐",
    "钟离","宇文","长孙","慕容","鲜于","闾丘",
    "司徒","司空","亓官","司寇","仉督","子车",
    "颛孙","端木","巫马","公西","漆雕","乐正",
    "壤驷","公良","拓拔","夹谷","宰父","谷粱",
    "晋","楚","阎","法","汝","鄢","涂","钦",
    "段干","百里","东郭","南门","呼延","归",
    "海","羊舌","微生","岳","帅","缑","亢",
    "况","后","有","琴","梁丘","左丘","东门",
    "西门","商","牟","佘","佴","伯","赏","南宫",
    "墨","哈","谯","笪","年","爱","阳","佟",
    "第五","言","福"
  ]
}

export type Options = {
  locale?: 'en' | 'zh'
}

export default function lastname({ locale }: Options = {}): string {
  const loc = locale || oneof(Object.keys(db))
  return oneof(db[loc])
}

/**
 * test
 */

import assert from 'assert'

describe('random firstname', function() {
  it('should gen firstname', function() {
    const gen = lastname()
    assert(gen)
  })

  it('should gen lastname with locale options', function() {
    const gen = lastname({ locale: 'en' })
    assert(/[a-zA-Z]/.test(gen))
    const gen2 = lastname({ locale: 'zh' })
    assert(!/[a-zA-Z]/.test(gen2))
  })
})
