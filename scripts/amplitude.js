function getBlogInfo () {
  var blogTitle = document.getElementsByClassName('blog-article__title')[0].innerText;
  var author = document.getElementsByClassName('author__name')[0].innerText;
  var categoryListCollection = document.getElementsByClassName('category-list')[0]; 
  categoryListCollection.innerText;
  categoryListCollection.innerText.split("\n");
  var categories = categoryListCollection.innerText.split("\n").filter(item => !!item);

  return {
    blogTitle,
    author,
    categories,
  }
}

function logAmplitudeEvent (eventType, eventProperties, test = false) {
  var customProperties = {
    ...eventProperties,
    ...getBlogInfo(),
    url: window.location.href,
  }

  if (test == true) {
    console.log(eventType, customProperties);
  } else {
    amplitude.getInstance().logEvent(eventType, customProperties);
  }  
};

document.addEventListener('DOMContentLoaded', function () {
  logAmplitudeEvent('PAGE LOADED', { pageType: 'blog' });
});

function logSocialShareClick (socialNetwork, subject) {
  return function () {
    logAmplitudeEvent('CLICK SOCIAL SHARE', {
        subject,
        type: socialNetwork,
      },
    );
  }
}

var socialLinks = document.getElementsByClassName('social-links__icon');

for (var i = 0; i < socialLinks.length; i++) {
  var socialNetwork = socialLinks[i].children[0].alt;
  var linkLocation = socialLinks[i].parentElement.parentElement.parentElement.parentElement.className === 'meta-block' ? 'sidebar' : 'footer';

  socialLinks[i].addEventListener('click', logSocialShareClick(socialNetwork, linkLocation));
}