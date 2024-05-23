import { Container } from '@/components/container'
import { GameProps } from '@/utils/types/game'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Label } from './components/label'
import { GameCard } from '@/components/GameCard'

async function getData(id: string) {
    2
    try {
        const res = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
            { next: { revalidate: 60 } }
        )

        return res.json()
    } catch {
        throw new Error('Failed to fetch data')
    }
}

async function getGameSorted() {
    try {
        const res = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
            { cache: 'no-store' }
        )

        return res.json()
    } catch {
        throw new Error('Failed to fetch data')
    }
}

export default async function Game({
    params: { id },
}: {
    params: { id: string }
}) {
    const game: GameProps = await getData(id)
    const sortedGame: GameProps = await getGameSorted()

    if (!game) {
        redirect('/')
    }

    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image
                    className="object-cover h-80 sm:h-96 w-full opacity-75"
                    src={game.image_url}
                    alt={game.title}
                    priority
                    fill={true}
                    quality="100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                />
            </div>

            <Container>
                <h1 className="font-bold text-xl my-4">{game.title}</h1>
                <p>{game.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas:</h2>
                <div className="flex gap-2 flex-wrap">
                    {game.platforms.map((item) => (
                        <Label key={item} name={item} />
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias:</h2>
                <div className="flex gap-2 flex-wrap">
                    {game.categories.map((item) => (
                        <Label key={item} name={item} />
                    ))}
                </div>

                <p className="mt-7 mb-2">
                    <strong>Data de lançamento:</strong> {game.release}
                </p>

                <h2 className="font-bold text-lg mt-7 mb-2">
                    Jogo recomendado:
                </h2>
                <div className="flex">
                    <div className="flex-grow">
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    )
}
