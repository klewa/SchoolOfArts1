//https://github.com/matowens/ng-notify

schoolApp.controller('dashboardController', function ($scope, Contact, Event, OfficeHour, Message, Employee, Article, Upload,
    $timeout, MessageBox, picturesUploadUrl, Document, pdfsUploadUrl, pdfsDownloadUrl, Utility, Attachment, picturesDownloadUrl,
    ngDialog) {

    $scope.pdfsDownloadUrl = pdfsDownloadUrl;
    $scope.picturesDownloadUrl = picturesDownloadUrl;

    $scope.ShowTree = true;
    $scope.ShowArticle = false;
    $scope.ShowHistoryEdit = false;

    $scope.ArticleToEdit = {};

    $scope.editArticle = function (key, articleTitle) {

        Article.getByKey(key).then(function (article) {
            if (key === "HIST") {
                $scope.ShowHistoryEdit = true;
            }
            else
                $scope.ShowArticle = true;

            $scope.ArticleToEdit = article;

            $scope.ArticleTitle = articleTitle;
            $scope.removePic = false;
            $scope.picFile = null;
            $scope.ShowTree = false;
        },
        function (error) {
            MessageBox.ShowError(error.message);
        }
      );
    }

    $scope.menuClicked = function () {
        $scope.goBackToTree();
    }
    $scope.markPicToRemove = function () {
        $scope.removePic = true;
    }

    $scope.markFileToRemove = function () {
        $scope.removeFile = true;
    }

    $scope.saveArticle = function (article, picFile) {

        if ($scope.removePic) {
            Attachment.delete("pictures", article.ImageUrl).then(function (response) {

                $scope.removePic = false;
                article.ImageUrl = "";

                Article.update(article).then(function (article) {
                    MessageBox.Show("Artigo foi atualizado.");

                }, function (error) {

                    MessageBox.ShowError(error.message);
                });
            },
                function (error) {
                    MessageBox.ShowError(error.message);
                });
        }
        else {

            Article.update(article).then(function (article) {

                MessageBox.Show("Artigo foi atualizado.");

                if (picFile && picFile.size && picFile.size > 0) {

                    if (article.ImageUrl) {
                        Attachment.delete("pictures", article.ImageUrl).then(function (response) {

                        },
                            function (error) {
                                MessageBox.ShowError(error.message);
                            });
                    }

                    Upload.upload(
                       {
                           url: picturesUploadUrl,
                           data: { file: picFile },
                       }).then(function (response) {

                           $timeout(function () {
                               var result = response.data.result;

                               article.ImageUrl = result.files.file[0].name;
                               Article.update(article).then(function (article) {
                                   MessageBox.Show("Objecto foi atualizado.");
                                   $scope.picFile = null;
                                   picFile = null;
                               }, function (error) {

                                   MessageBox.ShowError(error.message);
                               });
                           });

                       }, function (response) {
                           if (response.status > 0)
                               $scope.errorMsg = response.status + ': ' + response.data;
                           MessageBox.ShowError($scope.errorMsg);

                       }, function (evt) {
                           // Math.min is to fix IE which reports 200% sometimes
                           //$scope.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                           //MessageBox.Show($scope.picFile.progress);

                       });
                }
            }, function (error) {

                MessageBox.ShowError(error.message);
            });
        }

        ClearInputFileControls();
        $scope.goBackToTree();
    }

    $scope.DocumentToEdit = {};
    $scope.docFile = {};
    $scope.editDocument = function (key) {

        Document.getByKey(key).then(function (document) {
            $scope.DocumentToEdit = document;
            $scope.ShowDocumentEdit = true;
            $scope.ShowTree = false;
        },
        function (error) {
            MessageBox.ShowError(error.message);
        }
      );
    }

    $scope.saveDocument = function (doc, file) {

        if ($scope.removeFile) {

            Attachment.delete("pdfs", doc.Url).then(function (response) {
                $scope.removeFile = false;
                $scope.docFile = {};
                doc.Url = "";
                Document.update(doc).then(function (doc) {

                    MessageBox.Show("Documento foi atualizado.");

                }, function (error) {

                    MessageBox.ShowError(error.message);
                });
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        }
        else {

            if (doc.Url == "")
                doc.Url = " ";

            Document.update(doc).then(function (doc) {

                if (file != null && file.size != null && file.size > 0) {

                    //if to replace the file
                    if (doc.Size && doc.Size > 0) {
                        Attachment.delete("pdfs", doc.Url).then(function (response) {
                            MessageBox.Show("Pdf foi removido.");

                        },
                            function (error) {
                                MessageBox.ShowError(error.message);
                            });
                    }

                    Upload.upload(
                                   {
                                       url: pdfsUploadUrl,
                                       data: { file: file },
                                   }).then(function (response) {

                                       $timeout(function () {
                                           var result = response.data.result;
                                           doc.Url = result.files.file[0].name;
                                           doc.Size = result.files.file[0].size;

                                           Document.update(doc).then(function (doc) {
                                               MessageBox.Show("Documento foi atualizado.");
                                           }, function (error) {

                                               MessageBox.ShowError(error.message);
                                           });
                                       });

                                   }, function (response) {
                                       if (response.status > 0)
                                           $scope.errorMsg = response.status + ': ' + response.data;
                                       MessageBox.ShowError($scope.errorMsg);

                                   }, function (evt) {
                                       // Math.min is to fix IE which reports 200% sometimes
                                       //$scope.docFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                                       //MessageBox.Show("Progresso: " + $scope.docFile.progress + "%");
                                   });
                }
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        }

        ClearInputFileControls();
        $scope.goBackToTree();
    }

    Contact.get().then(function (address) {
        $scope.Contact = address;
    }
   , function (error) {
       MessageBox.ShowError(error.message);
   });

    $scope.editContact = function () {
        $scope.ShowContactInfoEdit = true;
        $scope.ShowTree = false;
    }

    ClearInputFileControls = function () {
        angular.element("input[type='file']").val(null);
    }
    $scope.saveContact = function (contact) {

        Contact.update(contact).then(function (address) {
            $scope.Contact = address;
            MessageBox.Show("Contacto foi atualizado.");
        }, function (error) {
            MessageBox.ShowError(error.message);
        });
        $scope.goBackToTree();
    }

    Event.getAll().then(function (events) {
        $scope.Events = events;
    }
    , function (error) {
        MessageBox.ShowError(error.message);
    });

    $scope.EventToEdit = {};

    $scope.editEvent = function (event) {
        if (event === null)
            event = Event.GetEmpty();

        $scope.EventToEdit = event;

        var date = new Date(event.Date);
        $scope.EventToEdit.Day = date.getDate();
        $scope.EventToEdit.Month = date.getMonth() + 1;
        $scope.EventToEdit.Year = date.getFullYear();

        $scope.ShowEventEdit = true;
        $scope.ShowTree = false;

    }

    $scope.saveEvent = function (event, picFile) {

        event.Date = new Date(event.Year, event.Month - 1, event.Day);

        event.Year = undefined;
        event.Month = undefined;
        event.Day = undefined;
        if (event.id)
            Event.update(event).then(function (eventObj) {
                event = eventObj;
                MessageBox.Show("Evento foi atualizado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        else
            Event.insert(event).then(function (eventObj) {
                $scope.Events.push(event);
                event = eventObj;
                MessageBox.Show("Evento foi inserido.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });

        if (picFile) {

            if (event.ImageUrl) {
                Attachment.delete("pictures", event.ImageUrl).then(function (response) {
                    MessageBox.Show("Imagem foi removida.");
                },
                    function (error) {
                        MessageBox.ShowError(error.message);
                    });
            }

            Upload.upload(
               {
                   url: picturesUploadUrl,
                   data: { file: picFile },
               }).then(function (response) {

                   $timeout(function () {
                       var result = response.data.result;

                       event.ImageUrl = result.files.file[0].name;
                       Event.update(event).then(function (event) {
                           MessageBox.Show("Evento foi atualizado.");
                       }, function (error) {

                           MessageBox.ShowError(error.message);
                       });
                   });

               }, function (response) {
                   if (response.status > 0)
                       $scope.errorMsg = response.status + ': ' + response.data;
                   MessageBox.ShowError($scope.errorMsg);

               }, function (evt) {
                   // Math.min is to fix IE which reports 200% sometimes
                   //$scope.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                   //MessageBox.Show($scope.picFile.progress);
               });
        }

        $scope.goBackToTree();
    }

    $scope.deleteEvent = function (event) {

        var nestedConfirmDialog = Utility.openDeleteConfirmDialog('o evento');
        nestedConfirmDialog.then(function (confirm) {

            Event.delete(event).then(function (eventObj) {
                var index = $scope.Events.indexOf(event);
                $scope.Events.splice(index, 1);
                MessageBox.Show("Evento foi removido.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        }, function (reject) {
        });



    }

    LoadEmployees();
    $scope.EmployeeToEdit = {};


    $scope.editEmployee = function (employee) {

        if (employee === null)
            employee = Employee.GetEmpty();

        $scope.EmployeeToEdit = employee;

        $scope.ShowEmployeeEdit = true;
        $scope.ShowTree = false;
    }
    $scope.picFile = {};

    $scope.saveEmployee = function (employee, picFile) {

        if (!employee.id || !employee.Sex)
            employee.Sex = "H";

        if (employee.id)
            Employee.update(employee).then(function (employeeObj) {
                employee = employeeObj;
                MessageBox.Show("Objecto funcionário '" + employee.Name + "' foi atualizado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        else
            Employee.insert(employee).then(function (employeeObj) {
                employee = employeeObj;
                MessageBox.Show("Objecto funcionário'" + employee.Name + "' foi criado.");
                LoadEmployees();

            }, function (error) {
                MessageBox.ShowError(error.message);
            });

        if (picFile && picFile.size > 0) {

            if (employee.Image) {
                Attachment.delete("pictures", employee.Image).then(function (response) {
                },
                    function (error) {
                        MessageBox.ShowError(error.message);
                    });
            }

            Upload.upload(
               {
                   url: picturesUploadUrl,
                   data: { file: picFile },
               }).then(function (response) {

                   $timeout(function () {
                       var result = response.data.result;
                       employee.Image = result.files.file[0].name;
                       Employee.update(employee).then(function (employeeObj) {

                       }, function (error) {
                           MessageBox.ShowError(error.message);
                       });
                   });

               }, function (response) {
                   if (response.status > 0)
                       $scope.errorMsg = response.status + ': ' + response.data;
                   MessageBox.ShowError($scope.errorMsg);

               }, function (evt) {
                   // Math.min is to fix IE which reports 200% sometimes
                   // $scope.picFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
               });
        }

        $scope.goBackToTree();
    }

    $scope.deleteEmployee = function (employee) {

        var nestedConfirmDialog = Utility.openDeleteConfirmDialog('o funcionário');
        nestedConfirmDialog.then(function (confirm) {

            Employee.delete(employee).then(function (employeeObj) {
                MessageBox.Show("Objecto funcionário'" + employee.Name + "' foi apagado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        }, function (reject) {

        });

        LoadEmployees();
    }

    Message.getAll().then(function (messages) {
        $scope.Messages = messages;
    }
    , function (error) {
        MessageBox.ShowError(error.message);
    });

    $scope.MessageToEdit = {};

    $scope.editMessage = function (message) {
        if (message === null)
            message = Message.GetEmpty();

        $scope.MessageToEdit = message;

        var date = new Date(message.ValidityDate);
        $scope.MessageToEdit.ValidDay = date.getDate();
        $scope.MessageToEdit.ValidMonth = date.getMonth() + 1;
        $scope.MessageToEdit.ValidYear = date.getFullYear();



        $scope.ShowMessageEdit = true;
        $scope.ShowTree = false;
    }

    $scope.saveMessage = function (message) {

        message.ValidityDate = new Date(message.ValidYear, message.ValidMonth - 1, message.ValidDay);

        message.ValidYear = undefined;
        message.ValidMonth = undefined;
        message.ValidDay = undefined;
        message.Audience = "PUBLIC";
        if (message.id)
            Message.update(message).then(function (messageObj) {
                MessageBox.Show("Anúncio foi atualizado.");
            }, function (error) {

                MessageBox.ShowError(error.message);
            });
        else
            Message.insert(message).then(function (messageObj) {
                $scope.Messages.push(message);
                MessageBox.Show("Anúncio foi criado.");
            }, function (error) {

                MessageBox.ShowError(error.message);
            });


        $scope.goBackToTree();
    }

    $scope.deleteMessage = function (message) {

        var nestedConfirmDialog = Utility.openDeleteConfirmDialog('o anúncio');
        nestedConfirmDialog.then(function (confirm) {

            Message.delete(message).then(function (messageObj) {
                var index = $scope.Messages.indexOf(message);
                $scope.Messages.splice(index, 1);
                Utility.showDialog("Anúncio foi eliminado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });

        }, function (reject) {
        });



    }

    OfficeHour.getByType("CLASSES").then(function (hours) {
        $scope.ClassesHours = hours;
    }
   , function (error) {
       MessageBox.ShowError(error.message);
   });

    OfficeHour.getByType("OFFICE").then(function (hours) {
        $scope.SecretaryOfficeHours = hours;
    }
   , function (error) {
       MessageBox.ShowError(error.message);
   });

    $scope.OfficeHoursToEdit = {};
    $scope.editOfficeHours = function (officeHours) {

        if (officeHours === null)
            officeHours = OfficeHour.GetEmpty();

        $scope.OfficeHoursToEdit = officeHours;
        $scope.OfficeHoursToEdit.HourType = officeHours.Type == "OFFICE";

        $scope.ShowOfficeHoursEdit = true;
        $scope.ShowTree = false;
    }

    $scope.saveOfficeHours = function (officeHours) {

        officeHours.Type = officeHours.HourType ? "OFFICE" : "CLASSES";

        if (officeHours.id)
            OfficeHour.update(officeHours).then(function (officeHoursObj) {
                MessageBox.Show("Horário foi atualizado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        else
            OfficeHour.insert(officeHours).then(function (officeHoursObj) {
                if (officeHours.Type == "OFFICE")
                    $scope.SecretaryOfficeHours.push(officeHours);
                else if (officeHours.Type == "CLASSES")
                    $scope.ClassesHours.push(officeHours);

                MessageBox.Show("Horário foi criado.");
            }, function (error) {
                MessageBox.ShowError(error.message);
            });


        $scope.goBackToTree();
    }

    $scope.deleteOfficeHours = function (officeHours) {

        var nestedConfirmDialog = Utility.openDeleteConfirmDialog('o horário');
        nestedConfirmDialog.then(function (confirm) {
            OfficeHour.delete(officeHours).then(function (officeHoursObj) {
                MessageBox.Show("Horário foi removido.");
                if (officeHours.Type == "OFFICE") {
                    var index = $scope.SecretaryOfficeHours.indexOf(officeHours);
                    $scope.SecretaryOfficeHours.splice(index, 1);
                }
                else if (officeHours.Type == "CLASSES") {
                    var index = $scope.ClassesHours.indexOf(officeHours);
                    $scope.ClassesHours.splice(index, 1);
                }
            }, function (error) {
                MessageBox.ShowError(error.message);
            });
        }, function (reject) {
        });
    }


    $scope.cancel = function () {
        $scope.goBackToTree();
    }

    $scope.goBackToTree = function () {

        $scope.ShowArticle = false;
        $scope.ShowDocumentEdit = false;
        $scope.ShowEventEdit = false;
        $scope.ShowContactInfoEdit = false;
        $scope.ShowEmployeeEdit = false;
        $scope.ShowAcademicYearEdit = false;
        $scope.ShowFileEdit = false;
        $scope.ShowMessageEdit = false;
        $scope.ShowOfficeHoursEdit = false;
        $scope.ShowHistoryEdit = false;
        $scope.ShowTree = true;
        $scope.docFile = null;
        $scope.picFile = null;

    }

    function LoadEmployees() {
        Employee.getByIsTeacher(true)
      .then(function (employees) {
          $scope.Teachers = employees;

      }
      , function (error) {
          MessageBox.ShowError(error.message);
      }
      );

        Employee.getByIsTeacher(false)
           .then(function (employees) {
               $scope.OtherEmployees = employees;

           }
           , function (error) {
               MessageBox.ShowError(error.message);
           }
           );
    }
}
    );