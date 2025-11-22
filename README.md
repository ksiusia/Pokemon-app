# Pokémon Explorer

This is a small React project where you can see Pokémon with their info and images. You can search by name and filter by type. Pokémon with two types have a nice gradient background.

## What it does

* Search Pokémon by name
* Filter Pokémon by type
* Shows Pokémon cards with:

  * Image
  * ID number
  * Name
  * Types
* Gradient background if Pokémon has two types
* Works on mobile and desktop

## Tech stuff

* React + TypeScript
* Ant Design for UI
* PokeAPI for data
* CSS for styling

## Files

* `src/Pokemons.tsx` – main page with Pokémon list and filters
* `src/Pokemon.tsx` – single Pokémon card
* `src/styles/pokemons.css` – layout and header styles
* `src/styles/pokemon.css` – Pokémon card styles

## Notes

* Data comes from [PokeAPI](https://pokeapi.co/)
* Buttons for types have their colors
* Gradient background works if Pokémon has 2 types

## Could add later

* Pagination or load more Pokémon
* Show more info like moves or abilities
* Card animations
* Dark/light theme
