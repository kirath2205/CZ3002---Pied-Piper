import { Button, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import React, { useState } from 'react';
import Palette from '@/components/Theme/theme'
import Data from '@/pages/campaigns/data'
interface Props{
    id : number
    campaigns: any
    setCampaign: any
}

const FilterButton = ({id, campaigns, setCampaign}:Props) => {
  const [activeButton, setActiveButton] = useState(id);
  const skillsList = [...Array.from(new Set(Data.map(Val => Val.skills)))];
  const showAllCampaign = () => {
    setActiveButton(-1);
    setCampaign(Data);
  } 
  const filterItem = (id:number , curskill: any)  => {
    setActiveButton(id);
    const newCampaign = Data.filter((Val) => {
        for (let i = 0; i < curskill.length; i++){
            if(!Val.skills.includes(curskill[i]))
            {
                return false;
            }
        }
        return true;
    });
    setCampaign(newCampaign);
  };
    return (
        <>
          <div className="d-flex justify-content-center">
            {skillsList.map((Val:any, id: number) => {
              return (
                <Palette>
                <Button
                    size='small'
                    variant='contained'
                    color={id == activeButton ? "primary" : "secondary"}
                    sx={{  
                        width: '20%', 
                        alignSelf: 'center', 
                        marginTop: 2,
                        marginLeft: 2,
                        marginRight: 2,
                         }}
                    onClick={() => filterItem(id, Val)}
                    key={id}
                >
                  {Val}
                </Button>
                </Palette>
              );
            })}
            <Button
                size='small'
                variant='contained'
                sx={{ backgroundColor: '#12CDD4',
                 color: '#fff', 
                 width: '20%', 
                 alignSelf: 'center', 
                 marginTop: 2,
                 marginLeft: 2,
                 marginRight: 2}}
                onClick={() => showAllCampaign()}
            >
              All
            </Button>
          </div>
        </>
      );
    };
    
//     return (
//         <Button

//         >
//             <FilterAltOutlinedIcon />
//             <Typography variant='button'>Filter</Typography>
//         </Button>
//     );
// };

export default FilterButton;
