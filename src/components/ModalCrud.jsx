import React, {Fragment, useEffect, useRef, useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
} from "reactstrap";

const ModalCrud = (args) => {
  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    setModal(!modal);
  if(e==true){
    setobj({...blankObj})
  }
  e=false;
  }

  let [count, setcount] = useState(0);
  const [blankObj, setblankObj] = useState({});
  const [obj, setobj] = useState({hobbies: []});
  const [array, setarray] = useState([]);
  const fileRef = useRef();

  const getData = async (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      } else {
        obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);
      }
      blankObj.hobbies = [];
    } else if (e.target.name == "profile") {
      console.log(e.target.files[0]);
      obj.profile = await toBase64(e.target.files[0]);
    } else {
      obj[e.target.name] = e.target.value;

      blankObj[e.target.name] = "";
    }

    setobj({...obj});
    setblankObj({...blankObj});
    // console.log(obj)
  };

  const save = () => {
    if (obj.id == undefined) {
      count = count + 1;
      setcount(count);
      obj.id = count;
      array.push(obj);
    } else {
      let index = array.findIndex((x) => x.id == obj.id);
      array.splice(index, 1, obj);
    }
    localStorage.setItem("array", JSON.stringify(array));
    localStorage.setItem("count", count);
    toggle();
    console.log(count);
    setarray([...array]);
    setobj({...blankObj});
    console.log(array);
    fileRef.current.value = "";
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const editUser = (id) => {
    let editObj = array.find((x) => x.id == id);
    setobj({...editObj});
    toggle();
  };

  const deleteUser = (id) => {
    console.log(id);
    let index = array.findIndex((x) => x.id == id);
    array.splice(index, 1);
    setarray([...array]);
    localStorage.setItem("array", JSON.stringify(array));
  };

  useEffect(() => {
    setarray(JSON.parse(localStorage.getItem("array")) || []);
    setcount(JSON.parse(localStorage.getItem("count")) || 0);
  }, []);

  return (
    <div>
      <Navbar className="navbar shadow-sm">
        <NavbarBrand className="me-auto nav-title">Student</NavbarBrand>
        <Button color="danger" onClick={toggle}>
          FORM
        </Button>
      </Navbar>
      <Modal isOpen={modal} toggle={toggle} {...args} className="modal1">
        <ModalHeader toggle={()=>toggle(true)}>FORM</ModalHeader>
        <ModalBody>
          <Fragment>
            <form action="" className="">
              {/* <h3>FORM {obj.fname}</h3> */}
              <label htmlFor="" className="d-block">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                className="w-100"
                value={obj.fname || ''}
                onChange={getData}
              />
              <label htmlFor="" className="d-block">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                className="w-100"
                value={obj.lname || ''}
                onChange={getData}
              />
              <label htmlFor="" className="d-block">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-100"
                value={obj.email || ''}
                onChange={getData}
              />
              <label htmlFor="" className="d-block">
                Gender
              </label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={obj.gender == "Male"}
                onChange={getData}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="FeMale"
                checked={obj.gender == "FeMale"}
                onChange={getData}
              />
              Female
              <label htmlFor="" className="d-block">
                Hobby
              </label>
              <input
                type="checkbox"
                name="hobbies"
                value="Cricket"
                checked={obj.hobbies?.includes("Cricket")}
                onChange={getData}
              />
              Cricket
              <input
                type="checkbox"
                name="hobbies"
                value="Football"
                checked={obj.hobbies?.includes("Football")}
                onChange={getData}
              />
              Football
              <input
                type="checkbox"
                name="hobbies"
                value="Music"
                checked={obj.hobbies?.includes("Music")}
                onChange={getData}
              />
              Music
              <label htmlFor="" className="d-block">
                Profile
              </label>
              <input
                type="file"
                name="profile"
                onChange={getData}
                ref={fileRef}
              />
              <br />
              <button
                type="button"
                className="btn btn-success mt-4"
                onClick={save}
              >
                Save
              </button>
            </form>
          </Fragment>
        </ModalBody>
      </Modal>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Hobby</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {array.map((x, i) => {
            return (
              <tr key={i}>
                <td>{x.id}</td>
                <td>
                  <img src={x.profile} alt="" width={40} height={40} />
                </td>
                <td>{x.fname}</td>
                <td>{x.lname}</td>
                <td>{x.email}</td>
                <td>{x.gender}</td>
                <td>{x.hobbies?.join(",")}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => editUser(x.id)}
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteUser(x.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModalCrud;
