const response = require ('express');
const { AuditoriaSchema } = require('../models/Auditoria');
const { ProductoSchema } = require('../models/Producto');
const { ProductoproveedorSchema } = require('../models/Productoproveedor');
const { ProveedorSchema } = require('../models/Proveedor');


//Listar Producto proveedor
const getProductoproveedores = async ( req, res = response ) => {
    try {
        const productoproveedores = await ProductoproveedorSchema.findAll({order:['id']});
        if(productoproveedores){
            res.json({productoproveedores})
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Obtener Producto proveedor
const getProductoproveedor = async ( req, res = response ) => {
    const { id } = req.params;
    try {
        const productoproveedores = await ProductoproveedorSchema.findByPk(id);
        if(productoproveedores){
            res.json({productoproveedores});
        }else{
            res.status(201).json({
                ok: false,
                msg: 'No existen Datos que mostrar'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Crear Producto proveedor
const crearProductoproveedor = async ( req, res = response ) => {
    const { producto, proveedor } = req.body;
    const auditoria = new AuditoriaSchema();
    try {
        let productos = await ProductoSchema.findByPk(producto);
        if(productos.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Producto esta inactivo'
            });
        }
        let proveedores = await ProveedorSchema.findByPk(proveedor);
        if(proveedores.estado === false){
            return res.status(400).json({
                ok: false,
                msg: 'Proveedor esta inactivo'
            });
        }
        let productoproveedores = new ProductoproveedorSchema(req.body);
        await productoproveedores.save();
        //Ingreso a la Auditoria
        auditoria.name='Ingreso de Producto Proveedor';
        auditoria.descripcion=`Ingreso de Producto Proveedor ${productoproveedores.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productoproveedores
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

//Editar Producto proveedor
const editarProductoproveedor = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        let productoproveedores = await ProductoproveedorSchema.findByPk(id);
        if(!productoproveedores){
            return res.status(404).json({
                msg: 'No existe Producto proveedor'
            });
        }

        await productoproveedores.update(req.body);
        //Ingreso a la Auditoria
        auditoria.name='Editar Producto Proveedor';
        auditoria.descripcion=`Se edito Producto Proveedor ${productoproveedores.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();

        res.json({productoproveedores})
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

//Eliminar Producto proveedor
const eliminarProductoproveedor = async ( req, res = response ) => {
    const { id } = req.params;
    const auditoria = new AuditoriaSchema();
    try {
        const productoproveedores = await ProductoproveedorSchema.findByPk(id);
        if(!productoproveedores){
            return res.status(404).json({
                msg: 'No existe Producto Proveedo'
            });
        }
        await productoproveedores.destroy();
        //Ingreso a la Auditoria
        auditoria.name='Eliminar Producto Proveedo';
        auditoria.descripcion=`Se elimino Producto Proveedo ${productoproveedores.id}`;
        auditoria.idusuario=req.id;
        await auditoria.save();
        res.status(201).json({
            ok: true,
            productoproveedores
        });
    } catch (error) {
        res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getProductoproveedores,
    getProductoproveedor,
    crearProductoproveedor,
    editarProductoproveedor,
    eliminarProductoproveedor
}