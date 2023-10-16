import React from 'react'

const SearchbarButton = ({ search, setPlace }) => {
    return (
        <div>
            {search.length > 0 && (
                <div className="flex">
                    <button
                        type="button"
                        onClick={setPlace}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                    >

                    </button>

                </div>
            )}
        </div>
    )
}

export default SearchbarButton
