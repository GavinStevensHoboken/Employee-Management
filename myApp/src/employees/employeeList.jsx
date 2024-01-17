import { List, ListItem, ListItemText, Link as MuiLink } from '@mui/material';

const EmployeeList = ({ employees }) => (
  <List>
    {employees.map(employee => (
      <ListItem key={employee.ssn} divider>
        <ListItemText
          primary={<MuiLink href={`/employee/${employee.ssn}`} target="_blank">{employee.name}</MuiLink>}
        />
      </ListItem>
    ))}
  </List>
);

export default EmployeeList;