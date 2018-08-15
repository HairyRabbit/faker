/**
 * gen lastname
 *
 * @flow
 */

import { pick, oneof, repeat } from './'

const db = {
  en: {
    [1]: [
      "James", "John", "Robert", "Michael", "William", "David",
      "Richard", "Joseph", "Charles", "Thomas", "Christopher",
      "Daniel", "Matthew", "George", "Donald", "Anthony", "Paul",
      "Mark", "Edward", "Steven", "Kenneth", "Andrew", "Brian",
      "Joshua", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey",
      "Frank", "Gary", "Ryan", "Nicholas", "Eric", "Stephen", "Jacob",
      "Larry", "Jonathan", "Scott", "Raymond", "Justin", "Brandon",
      "Gregory", "Samuel", "Benjamin", "Patrick", "Jack", "Henry",
      "Walter", "Dennis", "Jerry", "Alexander", "Peter", "Tyler",
      "Douglas", "Harold", "Aaron", "Jose", "Adam", "Arthur",
      "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence",
      "Joe", "Willie", "Gerald", "Roger", "Keith", "Jeremy", "Terry",
      "Harry", "Ralph", "Sean", "Jesse", "Roy", "Louis", "Billy",
      "Austin", "Bruce", "Eugene", "Christian", "Bryan", "Wayne",
      "Russell", "Howard", "Fred", "Ethan", "Jordan", "Philip",
      "Alan", "Juan", "Randy", "Vincent", "Bobby", "Dylan", "Johnny",
      "Phillip", "Victor", "Clarence", "Ernest", "Martin", "Craig",
      "Stanley", "Shawn", "Travis", "Bradley", "Leonard", "Earl",
      "Gabriel", "Jimmy", "Francis", "Todd", "Noah", "Danny", "Dale",
      "Cody", "Carlos", "Allen", "Frederick", "Logan", "Curtis", "Alex",
      "Joel", "Luis", "Norman", "Marvin", "Glenn", "Tony", "Nathaniel",
      "Rodney", "Melvin", "Alfred", "Steve", "Cameron", "Chad", "Edwin",
      "Caleb", "Evan", "Antonio", "Lee", "Herbert", "Jeffery", "Isaac",
      "Derek", "Ricky", "Marcus", "Theodore", "Elijah", "Luke", "Jesus",
      "Eddie", "Troy", "Mike", "Dustin", "Ray", "Adrian", "Bernard",
      "Leroy", "Angel", "Randall", "Wesley", "Ian", "Jared", "Mason",
      "Hunter", "Calvin", "Oscar", "Clifford", "Jay", "Shane", "Ronnie",
      "Barry", "Lucas", "Corey", "Manuel", "Leo", "Tommy", "Warren",
      "Jackson", "Isaiah", "Connor", "Don", "Dean", "Jon", "Julian",
      "Miguel", "Bill", "Lloyd", "Charlie", "Mitchell", "Leon", "Jerome",
      "Darrell", "Jeremiah", "Alvin", "Brett", "Seth", "Floyd", "Jim",
      "Blake", "Micheal", "Gordon", "Trevor", "Lewis", "Erik", "Edgar",
      "Vernon", "Devin", "Gavin", "Jayden", "Chris", "Clyde", "Tom",
      "Derrick", "Mario", "Brent", "Marc", "Herman", "Chase", "Dominic",
      "Ricardo", "Franklin", "Maurice", "Max", "Aiden", "Owen", "Lester",
      "Gilbert", "Elmer", "Gene", "Francisco", "Glen", "Cory", "Garrett",
      "Clayton", "Sam", "Jorge", "Chester", "Alejandro", "Jeff", "Harvey",
      "Milton", "Cole", "Ivan", "Andre", "Duane", "Landon"
    ],
    [2]: [
      "Mary", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice",
      "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora",
      "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel",
      "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie",
      "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie",
      "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy",
      "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora",
      "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie",
      "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie",
      "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet",
      "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan",
      "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie",
      "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola",
      "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda",
      "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy",
      "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline",
      "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann",
      "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva",
      "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty",
      "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie",
      "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred",
      "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett",
      "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn",
      "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell",
      "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda",
      "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora",
      "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly",
      "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda",
      "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian",
      "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura",
      "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester",
      "Lida", "Lina", "Winnie", "Claudia", "Marguerite", "Vera", "Cecelia",
      "Bess", "Emilie", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva",
      "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily",
      "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile",
      "Lucille", "Mabelle", "Rosalie"
    ]
  },
  zh: {
    [1]: [
      "豪","嘉","智","鸣","承","晨","旭","俊","哲",
      "睿","轩","涵","浩","博","宇","泽","文","祥",
      "杰","彦","圣","子","宏","卓","永","恒","海",
      "成","峰","渊","渊","迪","安","腾","森","平",
      "剑","德","涛","润","恒","建","启","培","瀚",
      "潇","奇","昱","宸","轶","怀","超","诚","其",
      "源","洋","舒","凌","添","峥","之","树","昕"
    ],
    [2]: [
      "佳","思","雪","梦","怡","海","涵","欣","敏",
      "文","惠","月","雅","美","诗","若","淑","梓",
      "清","歆","芸","舒","琳","羽","晨","蕊","瑶",
      "彤","语","茹","莹","琴","丽","倩","依","柔",
      "凝","悦","妍","玥","萱","琪","雨","菲","娇",
      "晗","颖","宁","娜","薇","曼","婉","婕","玲",
      "馨","艺","璐","媛","莉","静","雯","蕾","芹"
    ]
  }
}

export type Options = {
  locale?: 'en' | 'zh',
  sex?: 1 | 2,
  len?: 1 | 2
}

export default function firstname({ locale, sex, len }: Options = {}): string {
  const loc = locale || oneof(Object.keys(db))
  const num = loc === 'en'
        ? 1
        : (len || oneof([1, 2]))
  const psex = sex || oneof([1, 2])

  return pick(num, db[loc][psex]).join('')
}


/**
 * test
 */

import assert from 'assert'

describe('random firstname', function() {
  it('should gen firstname', function() {
    const gen = firstname()
    assert(gen)
  })

  it('should gen firstname with locale options', function() {
    const gen = firstname({ locale: 'en' })
    assert(/[a-zA-Z]/.test(gen))
    const gen2 = firstname({ locale: 'zh' })
    assert(!/[a-zA-Z]/.test(gen2))
  })

  it('should gen firstname with sex options', function() {
    const gen = firstname({ locale: 'en', sex: 2 })
    assert(~db.en[2].indexOf(gen))
  })

  it('should gen firstname with len options', function() {
    const gen = firstname({ locale: 'zh', len: 2 })
    assert(gen.length === 2)
  })
})
