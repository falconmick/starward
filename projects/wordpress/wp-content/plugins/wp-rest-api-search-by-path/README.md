# WP REST API - Search by Path
This plugin extends the WordPress REST API to allow querying a page using a path `example-parent/example-child` vs a slug `example-child`.

## Installing
1. Download the plugin into your plugins directory
2. Enable in the WordPress admin

## Using
```
HTTP GET: ${WP_URL}/wp-json/path/pages/${PAGE_PATH}
```

### Example Response

```
  "id": 2,
  "date": "2017-10-04T00:50:36",
  "date_gmt": "2017-10-04T00:50:36",
  "guid": {
    "rendered": "${WP_URL}/?page_id=2"
  },
  "modified": "2017-10-04T00:50:36",
  "modified_gmt": "2017-10-04T00:50:36",
  "slug": "sample-page",
  "status": "publish",
  "type": "page",
  "link": "${WP_URL}/sample-page/",
  "title": {
    "rendered": "Sample Page"
  },
  "content": {
    "rendered": "<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:</p>\n<blockquote><p>Hi there! I&#8217;m a miner by day, aspiring actor by night, and this is my website. I live in Kalgoorlie, have a great dog named Red, and I like yabbies. (And gettin&#8217; a tan.)</p></blockquote>\n<p>&#8230;or something like this:</p>\n<blockquote><p>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickeys to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</p></blockquote>\n<p>As a new WordPress user, you should go to <a href=\"${WP_URL}/wp-admin/\">your dashboard</a> to delete this page and create new pages for your content. Have fun!</p>\n",
    "protected": false
  },
  "excerpt": {
    "rendered": "<p>This is an example page. It&#8217;s different from a blog post because it will stay in one place and will &hellip; <a href=\"${WP_URL}/sample-page/\">Continued</a></p>\n",
    "protected": false
  },
  "author": 1,
  "featured_media": 0,
  "parent": 0,
  "menu_order": 0,
  "comment_status": "closed",
  "ping_status": "open",
  "template": "",
  "meta": Array[0][

  ],
  "_links": {
    "self": Array[1][
      {
        "href": "${WP_URL}/wp-json/wp/v2/pages/2"
      }
    ],
    "collection": Array[1][
      {
        "href": "${WP_URL}/wp-json/wp/v2/pages"
      }
    ],
    "about": Array[1][
      {
        "href": "${WP_URL}/wp-json/wp/v2/types/page"
      }
    ],
    "author": Array[1][
      {
        "embeddable": true,
        "href": "${WP_URL}/wp-json/wp/v2/users/1"
      }
    ],
    "replies": Array[1][
      {
        "embeddable": true,
        "href": "${WP_URL}/wp-json/wp/v2/comments?post=2"
      }
    ],
    "version-history": Array[1][
      {
        "href": "${WP_URL}/wp-json/wp/v2/pages/2/revisions"
      }
    ],
    "wp:attachment": Array[1][
      {
        "href": "${WP_URL}/wp-json/wp/v2/media?parent=2"
      }
    ],
    "curies": Array[1][
      {
        "name": "wp",
        "href": "https://api.w.org/{rel}",
        "templated": true
      }
    ]
  }
}
```
