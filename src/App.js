
import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';
function App() {

  // data set
  const [data,setData]= useState([]);
  useEffect(()=> {
    setData(EmployeeData)
  },[]);
  //  crate state
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [age,setAge]=useState() 
  const [id,setId]=useState()
  const [isUpdate, setIsUpadate]=useState(false)



  const handleEdit = (id) =>{
    const dt = data.filter(item => item.id === id);
    if(dt !== undefined)
    {
      setIsUpadate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  } 

  const handleDelete = (id) =>{
    if(id>0)
    {
      if(window.confirm("are you sure to delete this items?")){
      const dt =data.filter(item => item.id !==id);
      setData(dt);
    }
    }
  }
  const handleSave = (e) =>{
    let error ='';
    if(firstName === '')
      error += 'First name is required ';

    if(lastName === '')
      error += 'Last name is required ';

    if(age <=0)
      error += 'Age  is required ';
    
    if(error ==='')
    {

    
    e.preventDefault(); // it restrict other events
    const dt= [...data];
    const newobject={
      id:EmployeeData.length+1,
      firstName : firstName,
      lastName :lastName,
      age:age
    }
    // pushing in above data
    dt.push(newobject);
    setData(dt);
  }
  else{
    alert(error);
  }
  } 
  const handleUpdate = () =>{
     const index= data.map((item)=>{
      return item.id
     }).indexOf(id);

     //taking al data

     const dt=[...data];
     dt[index].firstName= firstName;
     dt[index].lastName= lastName;
     dt[index].age= age;
     setData(dt);
    handleClear();
  } 

  const handleClear = () =>{
    setId();
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpadate(false);
  } 


  return (
    <div className="App">

      <div style={{display:'flex', justifyContent:'center', marginTop:"10px", marginButton:"10px"}}>
            <div>
              <label> First Name :
                <input type='text' placeholder='Enter First name ' onChange={(e)=> setFirstName(e.target.value)} value={firstName}/>

              </label>
            </div>
            <div>
              <label> Last Name :
                <input type='text' placeholder='Enter Last name ' onChange={(e)=> setLastName(e.target.value)} value={lastName}/>

              </label>
            </div>
            <div>
              <label> Age :
                <input type='text' placeholder='Enter Age 'onChange={(e)=> setAge(e.target.value)} value={age} />

              </label>
            </div>
            <div>
              {

                // for showing save and update button only when required
                !isUpdate ? <button className='btn btn-primary' onClick={(e)=> handleSave(e)}>Save</button>

                :
                <button className='btn btn-primary' onClick={()=> handleUpdate()}>Update</button>


              }
            
            
            <button className='btn btn-danger' onClick={()=> handleClear()}>Clear</button>
            </div>
      </div>


      <table className='table table-hover'>
        <thead>
          <tr>
            <td> Sr.No</td>
            <td> Id</td>
            <td>First Name</td>
            <td>LastName</td>
            <td>age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
             data.map((item,index)=>{
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=> handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete </button>
                  </td>

                </tr>
              )
             })
          }
        </tbody>
      </table>
     
    </div>
  );
}

export default App;
