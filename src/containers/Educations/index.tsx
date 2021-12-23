import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box'
import Title from "../../components/Title";
import Search from "../../components/Search";
import AddButton from "../../components/AddButton";
import Table from "../../components/Table";
import { getColumns, Tables } from "../../components/Table/Columns";
import { RootState } from '../../store'
import { fetchEducations } from "../../store/educations/actions";

const Educations: React.FC = () => {
    const dispatch = useDispatch();

    const { educations } = useSelector(
        (state: RootState) => state.educationsState
    );

    useEffect(() => {
        console.log('234')
        if (!educations.length) dispatch(fetchEducations.started());
    }, []);

    return <Box>
        <Title color='#535E6C'>Education</Title>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Search placeholder="Search university" />
            <AddButton title="Add University" cb={() => { }} />
        </Box>
        <Table columns={getColumns(Tables.educations)} rows={educations} />
    </Box>
}

export default Educations
