
  const $search = $(".search-container");
  let searchb = document.createElement("form");
  let card = [];
  let modal = [];
  /**
   *``Displays Data to the api once Fetched
   *
   * @param {String} data
   */
  function view(data)
  {
      
    data.forEach((user, index) =>
    {
      let gallery = $("#gallery");
      let Dob = user.dob.date;
      let dob = Dob.slice(0,10);


      card = $(`
        <div class="card" id="${index}">
        <div class="card-img-container">
        <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="card-text">${user.email}</p>
        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>
        </div>
      `);
       
      modal = ($(`
        <div class="modal-container" href="${index}">
        <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.phone}</p>
        <p class="modal-text">${user.location.street}, ${user.location.city}, ${user.location.postcode}</p>
        <p class="modal-text">Birthday:${dob} </p>
        </div>
        </div>
        <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
        </div>
      `));

      gallery.append(card);
      gallery.append(modal);


      $(".modal-container").hide();

    });

    $("div .card").on("click", (e) =>
    {
      let target = $(e.target).closest(".card");

      if (e.type === "click")
      {
        $(`[href = '${target[0].id}']`).show();
        modalclick();
      }
    });

  }
  function modalclick ()
  {
    const close = $("#modal-close-btn");
    const prev = $("#modal-prev");
    const next = $("#modal-next");

    $("[type = 'button']").on("click", function(e)
    {
      let but = $(e.target).closest("[type='button']");
      let curr = $(e.target).closest(".modal-container");
      let getCard = $(".modal-container")[0].getAttribute("href");
      let raw = curr[0].getAttribute("href");
      let num = parseInt(raw);


      if (but[0].id === "modal-close-btn")
      {
        
        $(".modal-container").hide();
        num = 0;
      }
      else if (but[0].id === "modal-prev")
      {
        
        curr.hide();

        if (num === 0)
        {
          $("[href = '11']").show();
        }
        else
        {
          num -= 1;
          $(`[href = '${num}']`).show();
        };
      }
      else if (but[0].id === "modal-next")
      {
       
        curr.hide();

        if (num ===11)
        {
          $("[href = '0']").show();
        }
        else
        {
          num += 1;
          $(`[href = '${num}']`).show();
        }

      }

    });

  }




  
  fetch('https://randomuser.me/api/?results=12&nat=gb&inc=name,email,location,phone,picture,dob')
    .then(response => response.json())
    .then(data => view(data.results))
    .catch(error => console.error(error))
  ;

  
  searchb.innerHTML =
  `<input type="text" id="search-input" class="search-input" placeholder="Search...">
   <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">`;
  $search.append(searchb);

  /**
   * Filters Users for items in search 
   *
   */
  const find = function()
  {
    let input = ($("#search-input")[0].value).toLowerCase();
    console.log(input);

    for (let i = 0; i < $(".card").length; i ++)
    {
      const nameh = $(".card h3")[i];
      const name = nameh.innerHTML.toLowerCase()
      console.log(name)

      if (name.includes(input))
      {
        console.log(name.includes(input))
        nameh.closest(".card").style.display = "";
      }
      else
      {
        console.log(name.includes(input))
        console.log(input)
        console.log
        nameh.closest(".card").style.display = "none";
      }
    }

  };
  $search.on('keyup', find);
  $search.on('click',function(e){
    e.preventDefault();
  })


