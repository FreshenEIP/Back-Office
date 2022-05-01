export interface customerBody {
 username: string,
 post: any,
 like: number
}

interface infoCard {
 icon: string,
 count: number,
 title: string
}

export interface infoCards {
 users: infoCard,
 friperie: infoCard
}

export interface user {
 uid: string,
 email: string,
 username: string
}
