import React from 'react';

import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { Divider, IconButton } from 'material-ui';

import VisibilityIcon from '@material-ui/icons/Visibility'
export default function ConfigsList({ data, handleClick, handleViewConfig }) {
    return (
        !data || data.length === 0 ?
            <div>{'Não existem configurações salvas'}</div>
            :
            <List style={{ flexGrow: 1 }}>
                {data.map(item => {
                    return <div key={item.key}>
                        <ListItem
                            role={undefined}
                            dense
                            button
                            onClick={() => handleClick(item)}
                        >
                            <ListItemText primary={item.name} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="View" onClick={() => handleViewConfig(item)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                })}
            </List>
    )
}