$(document).ready(function() {
  function renderPost(post){
    $('#latest-posts').append(
      "<div class='post' data-id='" +
      post.id +
      "'><h6>Published on " +
      post.created_at +
      "</h6><p>" +
      post.description +
      "</p>" +
      "<button id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>" +
      "</div>"
      )
  }

  $.ajax({
    type:    'GET',
    url:     'https://turing-birdie.herokuapp.com/api/v1/posts.json',
    success: function(posts) {
      $.each(posts, function(index, post) {
        renderPost(post)
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })

  $('#create-post').on('click', function() {
    var postParams = {
      post: {
        description: $('#post-description').val()
      }
    }

    $.ajax({
      type:    'POST',
      url:     'https://turing-birdie.herokuapp.com/api/v1/posts.json',
      data:    postParams,
      success: function(newPost) {
        renderPost(newPost)
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })

  $('#latest-posts').on('click', '#delete-post', function() {
    var $post = $(this).closest(".post")

    $.ajax({
      type: 'DELETE',
      url: 'https://turing-birdie.herokuapp.com/api/v1/posts/' + $post.attr('data-id') + ".json",
      success: function() {
        $post.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
})
