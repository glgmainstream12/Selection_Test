import React, { useState } from 'react';

function Index() {
  const DOMINOS = [[6, 1], [4, 3], [5, 1], [3, 4], [1, 1], [3, 4], [1, 2]]
  const [dominos, setDominos] = useState<number[][]>([...DOMINOS])


  async function reset() {
    setDominos([...DOMINOS])
  }

 
  async function asc() {
    const sortedDominos = [...dominos].sort((a, b) => {
      const sumA = a[0] + a[1]
      const sumB = b[0] + b[1]
      if (sumA === sumB) return a[0] - b[0]
      return sumA - sumB
    })
    setDominos(sortedDominos)
  }



  async function desc() {
    const sortedDominos = [...dominos].sort((a, b) => {
      const sumA = a[0] + a[1]
      const sumB = b[0] + b[1]
      if (sumA === sumB) return b[0] - a[0]
      return sumB - sumA
    });
    setDominos(sortedDominos)
  }


  async function flip() {
    const flippedDominos = dominos.map(([top, bottom]) => [bottom, top])
    setDominos(flippedDominos)
  }


  async function removeDuplicates() {
    const uniqueDominos = dominos.filter(
      (domino, index, self) =>
        index === self.findIndex((d) => d[0] === domino[0] && d[1] === domino[1]))
    setDominos(uniqueDominos)
  }


  async function removeByTotal(total: number) {
    const filteredDominos = dominos.filter(
      ([top, bottom]) => top + bottom !== total)
    setDominos(filteredDominos)
  }


  const countDoubleNumbers = () =>
    dominos.filter(([top, bottom]) => top === bottom).length;

  return (
    <div className="bg-white h-screen w-screen">
      {/* Judul */}
      <div>
        <h1 className="text-black text-2xl p-5">Dominos</h1>
      </div>

      {/* Source and Double Numbers */}
      <div className="p-5 text-black">
        <h2 className="text-black text">Source</h2>
        <textarea
          className="w-full border border-gray-600"
          value={JSON.stringify(dominos)}
          readOnly
        ></textarea>
      </div>
      <div className="p-5 text-black">
        <h2 className="text-black text">Double Numbers</h2>
        <textarea
          className="w-full border border-gray-600"
          value={countDoubleNumbers()}
          readOnly
        ></textarea>
      </div>

      {/* Card Component */}
      <div className="flex flex-row items-center justify-center border-black">
        {dominos.map(([top, bottom], index) => (
          <div
            key={index}
            className="row m-5 w-16 h-16 border-3 border-black text-black"
          >
            <div className="w-8 h-8 border-black flex justify-center items-center">
              {top}
            </div>
            <div className="w-8 h-8 border-black flex justify-center items-center">
              {bottom}
            </div>
          </div>
        ))}
      </div>

      {/* Button Component */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={asc}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort (ASC)
        </button>
        <button
          onClick={desc}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort (DESC)
        </button>
        <button
          onClick={flip}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Flip
        </button>
        <button
          onClick={removeDuplicates}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Remove Dup
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Remove total */}
      <div className="flex justify-center items-center gap-4">
        <input
          id="removeTotal"
          className="border border-gray-300 rounded p-2 w-32 text-black"
          type="number"
          placeholder="Total to Remove"
        />
        <button
          onClick={() => {
            const input = document.getElementById(
              'removeTotal'
            ) as HTMLInputElement;
            const total = parseInt(input.value, 10);
            if (!isNaN(total)) removeByTotal(total);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default Index