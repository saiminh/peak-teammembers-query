document.addEventListener('DOMContentLoaded', () => {

  if( document.querySelector('.peak-teammembers-query-loop-home') ) {
    let teammembers = document.querySelectorAll('.teammember');  

    teammembers.forEach((teammember, index) => {
      const postID = Array.from(teammember.classList).filter(className => className.startsWith('post-') )[0];
      if ( postID ) {
        let teammemberLink = document.createElement('a');
        teammemberLink.classList.add('home-teammember-link');
        teammemberLink.setAttribute('href', `/team/#` + postID);
        teammemberLink.innerHTML = 'Read More';
        teammember.appendChild(teammemberLink);
      }
    })
  }

  if( document.querySelector('.peak-teammembers-query-loop') ) {
    let teammembers = document.querySelectorAll('.teammember');  

    teammembers.forEach((teammember, index) => {

      const postID = Array.from(teammember.classList).filter(className => className.startsWith('post-') )[0];
      teammember.setAttribute('id', postID);
      
      //fade in after load
      setTimeout(() => {
        teammember.classList.add('loaded');
      }, index * 100);
      
      //create a toggle element
      const toggle = document.createElement('div');
      toggle.classList.add('teammember-toggle');
      teammember.querySelector('.card-subtitle').appendChild(toggle);
      
      //listen to toggle element click
      teammember.addEventListener('click', (e) => {
        e.preventDefault();
        openTeammember(teammembers[index]);
      });
    });
  }
  setTimeout(() => {
    window.location.hash && openTeammember(document.getElementById(window.location.hash.replace('#', '')));
  }, 500)

});

const openTeammember = function(teammember) {

  // clone the teammember element
  let teammemberClone = teammember.cloneNode(true);
  teammember.parentNode.appendChild(teammemberClone);
  teammemberClone.classList.add('teammember-full-popup');
  teammemberClone.querySelector('.teammember-toggle').remove();
  //create a toggle element
  const fulltoggle = document.createElement('div');
  fulltoggle.classList.add('teammember-toggle');
  teammemberClone.querySelector('.wp-block-post-title').appendChild(fulltoggle);
  //listen to toggle element click
  fulltoggle.addEventListener('click', (e) => {
    closeTeammember(teammemberClone);
  });

  const prevnext = document.createElement('div');
  prevnext.classList.add('teammember-prevnext');
  teammemberClone.appendChild(prevnext);

  if (teammember.previousElementSibling) {
    //create a prev element
    const prev = document.createElement('div');
    prev.classList.add('teammember-prev');
    prevnext.appendChild(prev);

    //listen to prev click 
    prev.addEventListener('click', (e) => {
      e.preventDefault();
      closeTeammember(teammemberClone);
      openTeammember(teammember.previousElementSibling);
    });
  }
  
  if (false == teammember.nextElementSibling.classList.contains('teammember-full-popup') ) {
    //create a next element
    const next = document.createElement('div');
    next.classList.add('teammember-next');
    prevnext.appendChild(next);

    //listen to next click 
    next.addEventListener('click', (e) => {
      e.preventDefault();
      closeTeammember(teammemberClone);
      openTeammember(teammember.nextElementSibling);
    });
  }; 
  
}

const closeTeammember = function(element) {
  element.classList.add('reverse');
  setTimeout(() => {
    element.remove();
  }, 600);
};