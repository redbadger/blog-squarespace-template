function getBlogInfo () {
  var blogTitle = document.getElementsByClassName('blog-article__title')[0].innerText;
  var author = document.getElementsByClassName('author__name')[0].innerText;
  var categoryListCollection = document.getElementsByClassName('category-list')[0]; 
  var categories = categoryListCollection.innerText.split("\n").filter(item => !!item);

  return {
    blogTitle,
    author,
    categories,
    pageType: 'blog',
  }
}

function logAmplitudeEvent (eventType, eventProperties, test = false) {
  var blogInfo = document.getElementsByClassName('blog-article').length > 0 ? getBlogInfo() : { pageType: 'blogLanding' };
  var query = window.location.search.substr(1);

  var referrerProperties = { referrer: 'internal' };
  if (query.indexOf('utm_source') >= 0) {
    var utmProperties = {};
    query.split("&").forEach(function(part) {
      var item = part.split("=");
      utmProperties[item[0]] = decodeURIComponent(item[1]);
    });

    referrerProperties = {
      referrer: utmProperties.utm_source,
      utmContent: utmProperties.utm_content,
      utmMedium: utmProperties.utm_medium,
    };
  }

  var urlProperties = {
    ...referrerProperties,
    url: window.location.href,
  };

  var customProperties = {
    ...eventProperties,
    ...blogInfo,
    ...urlProperties,
  };

  if (test == true) {
    console.log(eventType, customProperties);
  } else {
    amplitude.getInstance().logEvent(eventType, customProperties);
  }
};

function logSocialShareClick (socialNetwork, subject) {
  return function () {
    logAmplitudeEvent('CLICK SOCIAL SHARE', {
        subject,
        type: socialNetwork,
      },
    );
  }
}

function logScrollDepth (scrollDepth) {
  var publishDate = new Date(document.getElementsByClassName('blog-article__time')[0].attributes.datetime.value);
  var daysSincePublished = Math.round((new Date - publishDate) / (1000 * 60 * 60 *24));
  logAmplitudeEvent('SCROLL', { daysSincePublished, scrollPercentage: scrollDepth });
}

var log100ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 100) {
    logScrollDepth(100);
    window.removeEventListener('scroll', log100ScrollDepth);
  }
};

var log75ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 75 && scrollPercentage < 100) {
    logScrollDepth(75);
    window.removeEventListener('scroll', log75ScrollDepth);
    window.addEventListener('scroll', log100ScrollDepth);
  }
};

var log50ScrollDepth = function () {
  var scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 50 && scrollPercentage < 75) {
    logScrollDepth(50);
    window.removeEventListener('scroll', log50ScrollDepth);
    window.addEventListener('scroll', log75ScrollDepth);
  }
};

var log25ScrollDepth = function () {
  var scrollPercentage = Math.round(((window.scrollY ? window.scrollY : window.pageYOffset) / (document.documentElement.scrollHeight - window.innerHeight))* 100);

  if (scrollPercentage >= 25 && scrollPercentage < 50) {
    logScrollDepth(25);
    window.removeEventListener('scroll', log25ScrollDepth);
    window.addEventListener('scroll', log50ScrollDepth);
  }
};

// All pages tracking

document.getElementsByClassName('site-footer__telLink')[0].addEventListener('click', function () {
  logAmplitudeEvent('CLICK CONTACT US', {type: 'phone', subject: 'footer'});
});

document.getElementsByClassName('site-footer__mailtoLink')[0].addEventListener('click', function () {
  logAmplitudeEvent('CLICK CONTACT US', {type: 'email', subject: 'footer'});
});

if (document.getElementsByClassName('blog-article').length > 0) {

  // Blog page tracking
  document.addEventListener('DOMContentLoaded', function () {
    logAmplitudeEvent('PAGE LOADED');
    logScrollDepth(0);
  });

  var socialLinks = document.getElementsByClassName('social-links__icon');
  for (var i = 0; i < socialLinks.length; i++) {
    var socialNetwork = socialLinks[i].children[0].alt;
    var linkLocation = socialLinks[i].parentElement.parentElement.parentElement.parentElement.className === 'meta-block' ? 'sidebar' : 'contentFooter';

    socialLinks[i].addEventListener('click', logSocialShareClick(socialNetwork, linkLocation));
  }

  window.addEventListener('scroll', log25ScrollDepth);
} else {

  // Landing page tracking
  document.addEventListener('DOMContentLoaded', function () {
    logAmplitudeEvent('PAGE LOADED');
  });
}
