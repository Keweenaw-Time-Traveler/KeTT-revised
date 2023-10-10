import React from 'react'
import { useRecoilState } from "recoil";
import { NavbartilesState } from '../../../../Atoms/NavbarTilesAtom';
import { ExpandTilesIcon } from "../../../../assets/icons/heroicons";

const TilesButton = () => {
    const [tilesView, setTilesView] = useRecoilState(NavbartilesState);
    return (
        <button className={`-pl-10 -ml-10  ml-[1px] md:hidden ${tilesView ? 'rotate-0 border-l-2' : 'rotate-180 border-r-2'}`} onClick={() => setTilesView(!tilesView)}>
            <ExpandTilesIcon className={`h-8 w-8 text-gray-500 bg-white rounded-full p-1 `} />
        </button>
    )
}

export default TilesButton
