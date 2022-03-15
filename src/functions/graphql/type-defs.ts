const { gql } = require("apollo-server-lambda");

export default gql`
  type Yob {
    id: ID! @unique
    name: String!
    image: String
    nominatedForAward: [Award!]!
      @relationship(
        type: "NOMINATED_FOR"
        direction: OUT
        properties: "NominatedFor"
      )
    winnerOfAward: Award
      @relationship(type: "WINNER_OF", direction: OUT, properties: "WinnerOf")
    filmChosenBy: [Film!]! @relationship(type: "CHOSEN_BY", direction: IN)
  }

  type Season {
    id: ID! @unique
    name: String!
    start: DateTime
    end: DateTime
  }

  type Film {
    id: ID! @unique
    slug: String! @unique
    title: String
    order: Int @unique
    poster_path: String
    budget: Int
    tagline: String
    runtime: Int
    overview: String
    vote_average: Float
    revenue: Int
    release_date: DateTime
    chosenByYob: Yob @relationship(type: "CHOSEN_BY", direction: OUT)
    watchedInSeason: Season @relationship(type: "WATCHED_IN", direction: OUT)
    nominatedForAward: [Award!]!
      @relationship(
        type: "NOMINATED_FOR"
        direction: OUT
        properties: "NominatedFor"
      )
    winnerOfAward: Award
      @relationship(type: "WINNER_OF", direction: OUT, properties: "WinnerOf")
    hasGenreGenre: [Genre!]! @relationship(type: "HAS_GENRE", direction: OUT)
    actorActedIn: [Actor!]!
      @relationship(type: "ACTED_IN", properties: "ActedIn", direction: IN)
    directorDirected: Director @relationship(type: "DIRECTED", direction: IN)
    featuresLanguage: [Language!]!
      @relationship(type: "FEATURES", direction: OUT)
    originCountry: [Country!]! @relationship(type: "ORIGIN", direction: OUT)
  }

  interface ActedIn @relationshipProperties {
    roles: [String!]
  }

  type Award {
    id: ID! @id
    name: String
    description: String
    type: String
    yobNominatedFor: [Yob!]!
      @relationship(
        type: "NOMINATED_FOR"
        direction: IN
        properties: "NominatedFor"
      )
    yobWinnerOf: Yob
      @relationship(type: "WINNER_OF", direction: IN, properties: "WinnerOf")
    filmNominatedFor: [Film!]!
      @relationship(
        type: "NOMINATED_FOR"
        direction: IN
        properties: "NominatedFor"
      )
    filmWinnerOf: Film
      @relationship(type: "WINNER_OF", direction: IN, properties: "WinnerOf")
  }

  type Actor {
    name: String
    id: ID! @id
    profile_path: String
    gender: Int
    popularity: Float
    actedInFilm: [Film!]!
      @relationship(type: "ACTED_IN", properties: "ActedIn", direction: OUT)
  }

  type Director {
    name: String
    id: ID! @id
    profile_path: String
    gender: Int
    popularity: Float
    directedFilm: [Film!]! @relationship(type: "DIRECTED", direction: OUT)
  }

  type Language {
    name: String @unique
    filmFeatures: [Film!]! @relationship(type: "FEATURES", direction: IN)
  }

  type Country {
    iso: String @unique
    name: String
    filmOrigin: [Film!]! @relationship(type: "ORIGIN", direction: IN)
  }

  type Genre {
    name: String @unique
    filmHasGenre: [Film!]! @relationship(type: "HAS_GENRE", direction: IN)
  }

  interface NominatedFor {
    season: String
    detail: String
  }

  interface WinnerOf {
    season: String
    detail: String
  }
`;
