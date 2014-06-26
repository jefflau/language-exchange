if(Threads.find().count() === 0) {
  var thread = {
    name: "Thread 1",
    messages: [
      {message: "He said something here", name: "Jeff", date: new Date()},
      {message: "Jon said something else here", name: "Jon", date: new Date()},
      {message: "She said something here", name: "Jennifer", date: new Date()}
    ]
  };

  Threads.insert(thread);
}
