$(document).ready(function(){

   var template_html = $('#todo-template').html();
   var template_function = Handlebars.compile(template_html);

   todolist();

  $('#addenter').click(function(){
    var newtodo = $('#addtodo').val().trim();
    if(newtodo.length > 0){
      $('#addtodo').val('');
      addnewtoToDOlist(newtodo);
    } else {
      alert('You will need to enter a new items to your list first!');
    }
  }); // end addenter click

  $('#todoList').on('click' , '#deletetodo' , function(){

    var todo_id = $(this).parent().attr('data-todo-id');
    $.ajax({
      url : 'http://157.230.17.132:3006/todos/' + todo_id,
      method : 'DELETE',
      success : function(data){
        todolist();
      },
      error : function(){
        alert('error');
      }
    }); // end ajax delete todo

  }); // end on click deletetodo

  function todolist(){
    $.ajax({
      url : 'http://157.230.17.132:3006/todos/',
      method : 'GET',
      success : function(data){
        $('#todoList').empty();
        var todo = data;
        for (var i = 0; i < todo.length; i++) {
          var todo_current = todo[i];
          var text_todo = todo_current.text;
          var todoID = todo_current.id;
          var template_data = {
            todo_id : todoID,
            text_todo : text_todo
          };
          var html_todo = template_function(template_data);
          $('#todoList').append(html_todo);
        } // end for todo
      },
      error : function(){
        alert('error');
      }
    });// End AJAX get
  }; // end todolist function

  function addnewtoToDOlist(a){
    $.ajax({
      url : 'http://157.230.17.132:3006/todos/',
      method : 'POST',
      data : {
        text : a
      },
      success : function(data){
        todolist();
      },
      error : function(){
        alert('error');
      }
    }); // end add new todo ajax
  }; // end function addnewtoToDOlist

}); // End Dom
