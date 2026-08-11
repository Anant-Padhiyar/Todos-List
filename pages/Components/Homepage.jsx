import React, { useState, useEffect } from 'react';

const Homepage = ({ mode, handleToggleMode, heading }) => {

  // Main input
  const [Title, setTitle] = useState('');

  // Edit input - separate from main input
  const [editTitle, setEditTitle] = useState('');

  // Items
  const [Items, setItems] = useState([]);

  // Currently editing index
  const [i, setI] = useState(null);


  // =========================
  // Update Items
  // =========================

  const update = () => {
    const itemsJsonArray =
      JSON.parse(localStorage.getItem('itemsJson')) || [];

    setItems(itemsJsonArray);
  };


  // =========================
  // Add Goal
  // =========================

  const getAndpdate = () => {

    if (Title.trim() !== '') {

      const itemsJsonArray =
        JSON.parse(localStorage.getItem('itemsJson')) || [];

      // Store only Title
      itemsJsonArray.push(Title);

      localStorage.setItem(
        'itemsJson',
        JSON.stringify(itemsJsonArray)
      );

      // Clear input
      setTitle('');

      // Update table
      setItems(itemsJsonArray);

    } else {

      alert('Set Your Goal');

    }
  };


  // =========================
  // Open Edit Modal
  // =========================

  const Edited = (index) => {

    setI(index);

    // Copy item to separate edit state
    setEditTitle(Items[index]);
  };


  // =========================
  // Update Title
  // =========================

  const EditUpdate = () => {

    if (i === null) {
      return;
    }

    const itemsJsonArray =
      JSON.parse(localStorage.getItem('itemsJson')) || [];

    // Update ONLY selected title
    itemsJsonArray[i] = editTitle;

    // Save to localStorage
    localStorage.setItem(
      'itemsJson',
      JSON.stringify(itemsJsonArray)
    );

    // Update table AFTER clicking Update
    setItems(itemsJsonArray);

    // Clear edit state
    setEditTitle('');
    setI(null);
  };


  // =========================
  // Delete
  // =========================

  const handleDelete = (index) => {

    if (confirm('Do you really want to Delete This Note?')) {

      const itemsJsonArray =
        JSON.parse(localStorage.getItem('itemsJson')) || [];

      itemsJsonArray.splice(index, 1);

      localStorage.setItem(
        'itemsJson',
        JSON.stringify(itemsJsonArray)
      );

      update();
    }
  };


  // =========================
  // Load Items
  // =========================

  useEffect(() => {
    update();
  }, []);


  // =========================
  // Clear List
  // =========================

  const clearstorage = () => {

    if (confirm('Do you really want to ClearList?')) {

      localStorage.removeItem('itemsJson');

      update();
    }
  };


  return (

    <div className="container">

      {/* =========================
          Heading
      ========================= */}

      <h2
        className="text-center mt-3"
        style={{
          color: mode === 'light'
            ? 'black'
            : 'white'
        }}
      >
        Todos List
      </h2>


      {/* =========================
          Add Goal
      ========================= */}

      <div className="mb-3 mx-2">

        <label
          htmlFor="title"
          className="form-label"
        >
          Set Your Goals here
        </label>

        <textarea
          className="form-control"
          id="title"
          rows="3"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            backgroundColor:
              mode === 'light'
                ? 'white'
                : 'black',

            color:
              mode === 'light'
                ? 'black'
                : 'white'
          }}
        ></textarea>

      </div>


      {/* =========================
          Buttons
      ========================= */}

      <div className="text-center mt-3 mb-3">

        <button
          type="button"
          id="add"
          className="btn btn-success mx-4"
          onClick={getAndpdate}
        >
          Submit
        </button>


        <button
          type="button"
          id="clear"
          className="btn btn-danger mx-4"
          onClick={clearstorage}
        >
          Clear List
        </button>

      </div>


      {/* =========================
          Table
      ========================= */}

     <div id="items">

  <table
    className={`table table-sm custom-table ${
      mode === 'light' ? 'light-mode' : 'dark-mode'
    }`}
    style={{
      width: '100%',
      tableLayout: 'auto'
    }}
  >

    <thead>
      <tr>

        <th
          scope="col"
          style={{
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }}
        >
          SNo       </th>

        <th
          scope="col"
          style={{
            textAlign: 'left',
            width: '100%',
               paddingLeft: '25px'
          }}
        >
          Goal
        </th>

        <th
          scope="col"
          style={{
            textAlign: 'right',
            whiteSpace: 'nowrap',
            paddingLeft: '0px',
            paddingRight: '27px'
          }}
          className=""
        >
          Edit
        </th>

        <th
          scope="col"
          style={{
            textAlign: 'right',
            whiteSpace: 'nowrap',
            paddingLeft: '20px',
            paddingRight: '20.5px'
          }}
          className=""
        >
          Delete
        </th>

      </tr>
    </thead>


    <tbody>

      {Items.map((item, index) => (

        <tr key={index} className="space-x-3">

          {/* SNo - LEFT */}
          <th
            scope="row"
            style={{
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}
          >
            {index + 1}
          </th>


          {/* Goal - LEFT */}
          <td
            style={{
              textAlign: 'left',
              width: '100%' ,
                 paddingLeft: '25px'
            }}
          >
            {item}
          </td>


          {/* Edit - RIGHT */}
          <td
            style={{
              textAlign: 'right',
              whiteSpace: 'nowrap',
              paddingLeft: '0px',
              paddingRight: '20px'
            }}
          >
            <button
              type="button"
              className="btn btn-warning btn-sm text-center"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => Edited(index)}
            >
              Edit
            </button>
          </td>


          {/* Delete - RIGHT */}
          <td
            style={{
              textAlign: 'right',
              whiteSpace: 'nowrap',
           paddingLeft: '15px',
              paddingRight: '15px',
              
            }}

          >
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


      {/* =========================
          Edit Modal
      ========================= */}

      <div
        className={`modal fade ${
          mode === 'light'
            ? 'light-mode'
            : 'dark-mode'
        }`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >

        <div className="modal-dialog">

          <div className="modal-content">


            {/* Modal Header */}

            <div className="modal-header">

              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
              >
                Edit Goal Here
              </h1>


              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

            </div>


            {/* Modal Body */}

            <div className="modal-body">

              <div className="mb-3">

                <label
                  htmlFor="EditT"
                  className="form-label"
                >
                  Goal
                </label>


                <textarea
                  className="form-control"
                  id="EditT"
                  rows="3"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                  style={{
                    backgroundColor:
                      mode === 'light'
                        ? 'white'
                        : 'black',

                    color:
                      mode === 'light'
                        ? 'black'
                        : 'white'
                  }}
                ></textarea>

              </div>


              {/* Update Button */}

              <div className="text-center mb-1">

                <button
                  type="button"
                  id="update"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={EditUpdate}
                >
                  Update
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Homepage;




