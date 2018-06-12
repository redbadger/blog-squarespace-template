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
  logAmplitudeEvent('SCROLL', { scrollPercentage: 0 }, true);
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

document.getElementsByClassName('site-footer__telLink')[0].addEventListener('click', function () {
  logAmplitudeEvent('CLICK CONTACT US', {type: 'phone', subject: 'footer'});
});

document.getElementsByClassName('site-footer__mailtoLink')[0].addEventListener('click', function () {
  logAmplitudeEvent('CLICK CONTACT US', {type: 'email', subject: 'footer'});
});

var log100ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 100) {
    logAmplitudeEvent('SCROLL', { scrollPercentage: 100 });
    window.removeEventListener('scroll', log100ScrollDepth);
  }
};

var log75ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 75 && scrollPercentage < 100) {
    logAmplitudeEvent('SCROLL', { scrollPercentage: 75 });
    window.removeEventListener('scroll', log75ScrollDepth);
    window.addEventListener('scroll', log100ScrollDepth);
  }
};

var log50ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 50 && scrollPercentage < 75) {
    logAmplitudeEvent('SCROLL', { scrollPercentage: 50 });
    window.removeEventListener('scroll', log50ScrollDepth);
    window.addEventListener('scroll', log75ScrollDepth);
  }
};

var log25ScrollDepth = function () {
  var scrollPercentage = Math.round(((window.scrollY ? window.scrollY : window.pageYOffset) / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 25 && scrollPercentage < 50) {
    logAmplitudeEvent('SCROLL', { scrollPercentage: 25 });
    window.removeEventListener('scroll', log25ScrollDepth);
    window.addEventListener('scroll', log50ScrollDepth);
  }
};

window.addEventListener('scroll', log25ScrollDepth);
