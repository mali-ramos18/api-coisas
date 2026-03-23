
const coisasModel = require('../model/coisasModel');

async function listarTodos(req, res) {
  try {
    const coisas = await coisasModel.listarTodos();
    
    res.status(200).json(coisas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar produtos', 
      erro: erro.message 
    });
  }
}


async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const coisa= await coisasModel.buscarPorId(id);
    
    if (coisa) {
      res.status(200).json(coisa);
    } else {
      res.status(404).json({ 
        mensagem: `coisa ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar coisa',
      erro: erro.message 
    });
  }
}


async function criar(req, res) {
  try {
    const { nomec, tipoc, valor,datac, qtdc } = req.body;
    
    if (!nomec || !tipoc || !valor|| !datac|| !qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    if (parseFloat(valor) <= 0) {
      return res.status(400).json({ 
        mensagem: 'O valor deve ser maior que zero' 
      });
    }
    
    if (parseInt(qtdc) < 0) {
      return res.status(400).json({ 
        mensagem: 'A quantidade não pode ser negativo' 
      });
    }

    const novaCoisa = await coisasModel.criar({ 
      nomec, 
      tipoc, 
      valor, 
      datac, 
      qtdc 
    });
    
    // Retornar o produto criado com status 201
    res.status(201).json(novaCoisa);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar coisa',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomec, tipoc, valor, datac, qtdc } = req.body;
    
    // Validações
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nomec || !tipoc || !valor || !datac || !qtdc) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    // Aguardar a atualização no banco
    const coisaAtualizada = await coisasModel.atualizar(id, { 
      nomec, 
      tipoc, 
      valor, 
      datac,
      qtdc 
    });
    
    if (coisaAtualizada) {
      res.status(200).json(coisaAtualizada);
    } else {
      res.status(404).json({ 
        mensagem: `Coisa ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar coisa',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    // Aguardar a deleção no banco
    const deletado = await coisasModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Coisa ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Coisa ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar coisa',
      erro: erro.message 
    });
  }
}


async function buscarPorTipoc(req, res) {
  try {
    const { tipoc } = req.params;
    
    // Aguardar a busca no banco
    const coisa = await coisasModel.buscarPorTipoc(tipoc);
    
    res.status(200).json(coisa);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar produtos por tipoc',
      erro: erro.message 
    });
  }
}


module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorTipoc
};
