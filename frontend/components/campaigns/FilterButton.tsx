//mui
import { Button } from '@mui/material';
//lib
import React, { useState } from 'react';
//components
import Palette from '@/components/Theme/theme';

//types
interface FilterButtonProps {
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    skills: string[];
    filter: string[];
}

/**
 *
 * Renders the filter buttons
 *
 * @param {FilterButtonProps} props - The setfilter function and the skills array
 * @returns {JSX.Element} - The filter buttons
 */
const FilterButton = ({ setFilter, skills, filter }: FilterButtonProps): JSX.Element => {
    const [selected, setSelected] = useState(skills.map((_) => false));
    /**
     * Sets the selected flag to false for all skills
     */
    const showAllCampaign = () => {
        setFilter(['']);
        setSelected(selected.map((_) => false));
    };

    /**
     * Sets the filter to the skill clicked
     *
     * @param {string} skill - The skill to set the filter
     * @param {number} selectedIndex - The index of the selected skill in the skills array
     */
    const filterItem = (skill: string, selectedIndex: number) => {
        let filter_new;
        let index = filter.indexOf('');
        if (index > -1) {
            filter.splice(index, 1);
        }
        if (selected[selectedIndex] == true) {
            filter_new = filter.filter((s) => s != skill);
            setFilter(filter_new);
            selected[selectedIndex] = false;
        } else {
            filter_new = filter.concat(skill);
            setFilter(filter_new);
            selected[selectedIndex] = true;
        }
        let selected_new = selected;
        setSelected(selected_new);
    };
    return (
        <>
            <div className='d-flex justify-content-center'>
                {skills.map((skill, index) => (
                    <Palette key={skill}>
                        <Button
                            size='small'
                            variant='contained'
                            color={selected[index] ? 'secondary' : 'primary'}
                            sx={{
                                alignSelf: 'center',
                                marginTop: 2,
                                marginLeft: 2,
                                marginRight: 2,
                            }}
                            onClick={() => filterItem(skill, index)}
                        >
                            {skill}
                        </Button>
                    </Palette>
                ))}
                <Palette>
                    <Button
                        size='small'
                        variant='contained'
                        color={selected.every((skill) => !skill) ? 'secondary' : 'primary'}
                        sx={{
                            color: '#fff',
                            width: '5%',
                            alignSelf: 'center',
                            marginTop: 2,
                            marginLeft: 2,
                            marginRight: 2,
                        }}
                        onClick={() => showAllCampaign()}
                    >
                        All
                    </Button>
                </Palette>
            </div>
        </>
    );
};
export default FilterButton;
