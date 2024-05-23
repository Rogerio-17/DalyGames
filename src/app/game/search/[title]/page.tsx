import { GameCard } from '@/components/GameCard'
import { Input } from '@/components/Input'
import { Container } from '@/components/container'
import { GameProps } from '@/utils/types/game'

async function getData(title: string) {
    const decodeTitle = decodeURI(title)
    try {
        const res = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
        )

        return res.json()
    } catch {
        throw new Error('Failed to fetch data')
    }
}

export default async function Search({
    params: { title },
}: {
    params: { title: string }
}) {
    const games: GameProps[] = await getData(title)

    return (
        <main className="w-full text-black">
            <Container>
                <Input />

                <h1 className="font-bold text-xl mt-8 mb-5">
                    Veja o que encontramos para você
                </h1>

                {!games && <p>Jogo não encontrado...</p>}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games &&
                        games.map((item) => (
                            <GameCard key={item.id} data={item} />
                        ))}
                </section>
            </Container>
        </main>
    )
}
