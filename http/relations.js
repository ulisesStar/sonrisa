var conector = require('./connection');

// MODELOS

var anecdotas = require('./db/modeloAnecdotas')(conector);
var areas = require('./db/modeloAreas')(conector);
var campanas = require('./db/modeloCampanas')(conector);
var donativo = require('./db/modeloDonativo')(conector);
var eventos = require('./db/modeloEventos')(conector);
var imagenes = require('./db/modeloImagenes')(conector);
var institucion = require('./db/modeloInstitucion')(conector);
var pendiente = require('./db/modeloPendiente')(conector);
var progreso = require('./db/modeloProgreso')(conector);
var proyectos = require('./db/modeloProyectos')(conector);
var status = require('./db/modeloStatus')(conector);
var terminado = require('./db/modeloTerminado')(conector);
var usuario = require('./db/modeloUsuario')(conector);
var materiales = require('./db/modeloMateriales')(conector);
var ubicacion = require('./db/modeloUbicacion')(conector);
var aportaciones = require('./db/modeloAportaciones')(conector);
var multimedia = require('./db/modeloMultimedia')(conector);
var portada = require('./db/modeloPortada')(conector);

var avatar = require('./db/modeloAvatar')(conector);

//RElACIONES

proyectos.belongsTo(status);

institucion.hasMany(usuario , {foreignKey: 'id_institucion'});
usuario.hasMany(anecdotas , {foreignKey: 'id_usuario'});
campanas.hasMany(proyectos , {foreignKey: 'id_campanas'});

proyectos.belongsToMany(ubicacion, {as:'Ubicacion', through: 'proyectos_ubicacion', foreignKey: 'id_proyecto'});
ubicacion.belongsToMany(proyectos, {as:'Proyectos', through: 'proyectos_ubicacion', foreignKey: 'id_ubicacion'});

proyectos.hasOne(portada, {foreignKey: 'id_proyecto'});
portada.belongsTo(proyectos, {foreignKey: 'id_proyecto'});

eventos.belongsToMany(usuario , {as:'Usuario' , through: 'eventos_usuario', foreignKey: 'id_eventos'});
usuario.belongsToMany(eventos , {as:'Eventos' , through: 'eventos_usuario', foreignKey: 'id_usuario'});

areas.belongsToMany(proyectos , {as:'Proyectos', through: 'areas_proyectos', foreignKey: 'id_areas'});
proyectos.belongsToMany(areas , {as:'Areas', through: 'areas_proyectos', foreignKey: 'id_proyecto'});

usuario.belongsToMany(materiales , {as:'Materiales', through: aportaciones, foreignKey: 'id_usuario'});
materiales.belongsToMany(usuario , {as:'Usuario', through: aportaciones, foreignKey: 'id_materiales'});

usuario.belongsToMany(proyectos , {as:'Proyectos', through: anecdotas, foreignKey: 'id_usuario'});
proyectos.belongsToMany(usuario , {as:'Usuario', through: anecdotas, foreignKey: 'id_proyecto'});

anecdotas.hasMany(multimedia, {foreignKey: 'id_anecdota'})

materiales.belongsTo(proyectos , {foreignKey: 'id_proyecto'});
proyectos.hasMany(materiales , {foreignKey: 'id_proyecto'});

status.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
status.belongsTo(progreso , {foreignKey: 'id_progreso'});
status.belongsTo(terminado , {foreignKey: 'id_terminado'});

eventos.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
eventos.belongsTo(progreso , {foreignKey: 'id_progreso'});
eventos.belongsTo(terminado , {foreignKey: 'id_terminado'});

pendiente.hasMany(eventos , {foreignKey: 'id_pendiente'});
progreso.hasMany(eventos , {foreignKey: 'id_progreso'});
terminado.hasMany(eventos , {foreignKey: 'id_terminado'});

imagenes.belongsTo(pendiente , {foreignKey: 'id_pendiente'});
imagenes.belongsTo(progreso , {foreignKey: 'id_progreso'});
imagenes.belongsTo(terminado , {foreignKey: 'id_terminado'});

pendiente.hasMany(imagenes , {foreignKey: 'id_pendiente'});
progreso.hasMany(imagenes , {foreignKey: 'id_progreso'});
terminado.hasMany(imagenes , {foreignKey: 'id_terminado'});

avatar.belongsTo(usuario , {foreignKey: 'id_usuario'});
usuario.hasMany(avatar , {foreignKey: 'id_usuario'});

module.exports.anecdotas = anecdotas;
module.exports.areas = areas;
module.exports.campanas = campanas;
module.exports.donativo = donativo;
module.exports.eventos = eventos;
module.exports.imagenes = imagenes;
module.exports.institucion = institucion;
module.exports.pendiente = pendiente;
module.exports.progreso = progreso;
module.exports.proyectos = proyectos;
module.exports.status = status;
module.exports.terminado = terminado;
module.exports.usuario = usuario;
module.exports.materiales = materiales;
module.exports.ubicacion = ubicacion;
module.exports.aportaciones = aportaciones;
module.exports.portada = portada;

module.exports.avatar = avatar;
