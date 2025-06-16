import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const Route = createFileRoute('/pokemon')({
  component: RouteComponent,
})

type Pokemon = {
  name: string
  sprites: {
    front_default: string
  }
}

function getRandomId() {
  return Math.floor(Math.random() * 150) + 1
}

async function fetchPokemon(): Promise<Pokemon> {
  try {
    const id = getRandomId()
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch Pokémon with ID ${id}`)
    }

    const data = await res.json()

    return {
      name: data.name,
      sprites: { front_default: data.sprites.front_default },
    }
  } catch (error) {
    console.error('Error fetching Pokémon:', error)
    throw error
  }
}

function RouteComponent() {
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState('')

  const {
    data: pokemon,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['random-pokemon'],
    queryFn: fetchPokemon,
  })

  function handleGuessSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pokemon) return
    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setResult('Correct! 🎉')
    } else {
      setResult(`Wrong! It was ${pokemon.name}. ❌`)
    }
  }

  function handlePlayAgain() {
    setResult('')
    setGuess('')
    refetch()
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Guess the Pokémon!</h1>

      {isPending ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <>
          {pokemon && (
            <img
              src={pokemon.sprites.front_default}
              alt="Guess the Pokémon"
              className="w-32 h-32 image-render-pixelated mb-4"
            />
          )}

          <form onSubmit={handleGuessSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter name"
              className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Guess
            </button>
          </form>

          {result && (
            <div className="flex flex-col">
              <p className="mb-2 text-lg">{result}</p>
              <button
                onClick={handlePlayAgain}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
